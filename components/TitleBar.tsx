import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

import { Modal } from "components/Modal";

export const TitleBar = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="flex">
      <h1 className="px-8 py-4 text-2xl font-belerenSmallCaps flex-auto">
        Limited Grades
      </h1>

      <button
        onClick={() => setShowInfoModal(true)}
        className="hover:text-blue-500 flex gap-1 justify-center items-center"
      >
        <FaInfoCircle className="inline" />
        <span>About this project</span>
      </button>

      <Modal
        title="About this project"
        open={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      >
        <p className="mb-2">
          This page uses{" "}
          <a
            href="https://www.17lands.com/card_ratings"
            target="_blank"
            rel="noreferrer"
          >
            17Lands
          </a>{" "}
          Premier Draft data to assign letter grades to cards. It infers a
          normal distribution from the{" "}
          <a
            href="https://www.17lands.com/metrics_definitions#:~:text=Games%20in%20Hand%20Win%20Rate%20(GIH%20WR)"
            target="_blank"
            rel="noreferrer"
          >
            Games in Hand Win Rate
          </a>{" "}
          statistic and uses that distribution to assign a grade to each card.
          For example, a card with a win rate that is one standard deviation
          higher than the mean would get a B. Cards drawn fewer than 200 times
          are not included.
        </p>
        <p>
          You can hover over cards to see card previews and you can click on
          cards to get a breakdown of how well the card does in different
          archetypes.
        </p>
      </Modal>

      {/* Adapted from https://tholman.com/github-corners/ */}
      <a
        href="https://github.com/youssefm/limited-grades"
        className="github-corner"
        aria-label="View source on GitHub"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          width={64}
          height={64}
          viewBox="0 0 250 250"
          style={{
            fill: "#151513",
            color: "#fff",
          }}
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: "130px 106px" }}
            className="octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
};
