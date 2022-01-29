import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { HeatMapGrid } from "react-grid-heatmap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import RarityFilter from "components/RarityFilter";
import SetSelector from "components/SetSelector";
import { SET_LABELS } from "lib/constants";
import PageFooter from "components/PageFooter";
import CardTypeFilter from "components/CardTypeFilter";
import { getCards } from "lib/cards";
import { Grade, Rarity, MagicSet, CardType } from "lib/types";
import CardTable from "components/CardTable";
import { CardTableDictionary } from "lib/table";

export const getStaticPaths = async () => {
  return {
    paths: Object.values(MagicSet).map((set) => ({ params: { set } })),
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const set = context.params!.set as MagicSet;
  return {
    props: {
      set,
      cards: await getCards(set),
      lastUpdatedAtTicks: new Date().getTime(),
    },
    // Rebuild pages from 17Lands data every twelve hours
    revalidate: 12 * 60 * 60,
  };
};

const Page = ({
  set,
  cards,
  lastUpdatedAtTicks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [selectedSet, setSelectedSet] = useState(set);
  const [loading, setLoading] = useState(false);
  const [visibleRarities, setVisibleRarities] = useState(
    new Set(Object.values(Rarity))
  );
  const [visibleCardTypes, setVisibleCardTypes] = useState(
    new Set(Object.values(CardType))
  );
  const [showSkeletons, setShowSkeletons] = useState(false);

  useEffect(() => {
    if (selectedSet === set) {
      if (loading) {
        setLoading(false);
        setShowSkeletons(false);
      }
    } else {
      if (loading) {
        router.push(`/${selectedSet}`);
      } else {
        setSelectedSet(set);
      }
    }
  }, [selectedSet, set, loading, router]);

  useEffect(() => {
    if (loading) {
      // Add small delay before showing placeholders to prevent screen stuttering
      const timer = setTimeout(() => setShowSkeletons(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowSkeletons(false);
    }
  }, [loading]);

  const filteredCards = cards
    .filter((card) => visibleRarities.has(card.rarity))
    .filter((card) =>
      card.cardTypes.some((cardType) => visibleCardTypes.has(cardType))
    );
  const cardDictionary = new CardTableDictionary(filteredCards);
  const gradeGrid = [...Array(13)].map(e => Array(13).fill(0));;

  const GRADE_POINTS: Record<string,number> = {
    "A+": 12,
    "A": 11,
    "A-": 10,
    "B+": 9,
    "B": 8,
    "B-": 7,
    "C+": 6,
    "C": 5,
    "C-": 4,
    "D+": 3,
    "D": 2,
    "D-": 1,
    "F": 0, 
  };

  for (var card of cardDictionary.getAll()) {
    gradeGrid[12-GRADE_POINTS[card.guessedGrade]][12-GRADE_POINTS[card.grade]] += 1;
  }
  let xLabels = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
  let yLabels = xLabels;

  function getAvg(scores: number[]): number {
    const total: number = scores.reduce((acc, c) => acc + c, 0);
    return Math.round(total / scores.length * 100) / 100;
  }
  const diffs = ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"]
  const dataBar = {
    labels: diffs,
    datasets: [
      {
        label: "Cards with difference",
        data: diffs.map(l => cardDictionary.getAll().filter(c => c.diff == parseInt(l)).length),
        backgroundColor: [
          "rgba(255, 134,159,0.4)", //r
          "rgba(255, 177, 101,0.4)", //o
          "rgba(255, 218, 128,0.4)", //y
          "rgba(113, 205, 205,0.4)", //g
          "rgba(98,  182, 239,0.4)", //b
          "rgba(113, 205, 205,0.4)", //g
          "rgba(255, 218, 128,0.4)", //y
          "rgba(255, 177, 101,0.4)", //o
          "rgba(255, 134,159,0.4)" //r
        ],
        borderWidth: 2,
        borderColor: [
          "rgba(255, 134, 159, 1)", //r
          "rgba(255, 177, 101, 1)", //o
          "rgba(255, 218, 128, 1)", //y
          "rgba(113, 205, 205, 1)", //g
          "rgba(98,  182, 239, 1)", //b
          "rgba(113, 205, 205, 1)", //g
          "rgba(255, 218, 128, 1)", //y
          "rgba(255, 177, 101, 1)", //o
          "rgba(255, 134, 159, 1)" //r
        ]
      }
    ]
  };
  function rgbaFromDiffAndAlpha(diff: number, alpha: number): string {
    if (diff <= -4 || diff >= 4) {
      return "rgba(255, 134, 159," + alpha + ")";
    } else if (diff == -3 || diff == 3) {
      return "rgba(255, 177, 101," + alpha + ")";
    } else if (diff == -2 || diff == 2) {
      return "rgba(255, 218, 128," + alpha + ")";
    } else if (diff == -1 || diff == 1) {
      return "rgba(113, 205, 205," + alpha + ")";
    } else {
      return "rgba(98,  182, 239," + alpha + ")";
    }
  }
  const barChartOptions = {
    responsive: false,
    maintainAspectRatio: false
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
  );

  return (
    <div className="px-2 overflow-auto">
      <Head>
        <title>Limited Grades – {SET_LABELS[selectedSet]}</title>
      </Head>
      <div className="px-4 py-4 bg-zinc-100 rounded-t-lg flex gap-2 flex-col lg:px-8 lg:flex-row lg:gap-4">
        <SetSelector
          value={selectedSet}
          onChange={(newValue) => {
            setSelectedSet(newValue);
            setLoading(true);
          }}
        />
        <div className="flex gap-4">
          <RarityFilter
            set={set}
            values={visibleRarities}
            setValues={setVisibleRarities}
          />
          <CardTypeFilter
            values={visibleCardTypes}
            setValues={setVisibleCardTypes}
          />
        </div>
        <div>
          <div className="text-sm mb-2 lg:block">Score</div>
          <div className="text-lg mb-2 lg:block">{getAvg(cardDictionary.getAll().map(c => 120 - 20 * Math.abs(c.diff))) + " on " + cardDictionary.getAll().length + " grades"}</div>
          <div className="text-sm mb-2 lg:block"> (120 each minus 20 per difference) </div>
          <table>
            <tr>
              <td style={{textAlign:"center"}}>
                <img style={{display: "inline"}} src={"/crown_icon_135729.svg"}/>
              </td>
              <td>
                <div> = 120 points </div>
              </td>
            </tr>
            <tr>
              <td style={{textAlign:"center"}}>
                <img style={{display: "inline"}} src={"/chevron_up_icon_136782.svg"}/>
                <img style={{display: "inline"}} src={"/chevron_down_icon_138765.svg"}/>
              </td>
              <td>
                <div> = 100 points </div>
              </td>
            </tr>
            <tr>
              <td style={{textAlign:"center"}}>
                <img style={{display: "inline"}} src={"/chevron_double_up_icon_138766.svg"}/>
                <img style={{display: "inline"}} src={"/chevron_double_down_icon_136787.svg"}/>
              </td>
              <td>
                <div> = 80 points </div>
              </td>
            </tr>
            <tr>
              <td style={{textAlign:"center"}}>
                <img style={{display: "inline"}} src={"/chevron_triple_up_icon_137765.svg"}/>
                <img style={{display: "inline"}} src={"/chevron_triple_down_icon_135769.svg"}/>
              </td>
              <td>
                <div> = 60 points </div>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <div className="text-sm mb-2 hidden lg:block">Differences</div>
          <Bar data={dataBar} options={barChartOptions} />
        </div>
        <HeatMapGrid
          xLabels={xLabels}
          yLabels={yLabels}
          data={gradeGrid}
          cellRender={(x, y, value) => (
            <div title={`Prediction ${xLabels[x]} vs Stats ${yLabels[y]}`}>{value}</div>
          )}
          cellHeight='1rem'
          square
          xLabelsStyle={(index) => ({
            color: index % 3 != 1 && index < 12? 'transparent' : '#777',
            fontSize: '.8rem'
          })}
          yLabelsStyle={(index) => ({
            color: index % 3 != 1 && index < 12? 'transparent' : '#777',
            fontSize: '.8rem'
          })}
          cellStyle={(x, y, ratio) => ({
            background: rgbaFromDiffAndAlpha(x-y, ratio),
            fontSize: ".6rem",
          })}
        />
      </div>
      <CardTable
        cardDictionary={cardDictionary}
        showSkeletons={showSkeletons}
      />
      <PageFooter lastUpdatedAtTicks={lastUpdatedAtTicks} />
    </div>
  );
};

export default Page;

export const config = {
  unstable_includeFiles: ["data/oracle-cards.json"],
};
