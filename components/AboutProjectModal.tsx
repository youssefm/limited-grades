import { FC } from "react";

import LinkOut from "components/LinkOut";
import Modal from "components/Modal";

interface Props {
  onClose: () => void;
}

const AboutProjectModal: FC<Props> = ({ onClose }) => (
  <Modal title="About this project" onClose={onClose}>
    <div className="max-w-[80ch]">
      <p className="mb-4">
        This page uses{" "}
        <LinkOut url="https://www.17lands.com/card_ratings">17Lands</LinkOut>{" "}
        Premier Draft data to assign letter grades to cards. It infers a normal
        distribution from the{" "}
        <LinkOut url="https://www.17lands.com/metrics_definitions#:~:text=Games%20in%20Hand%20Win%20Rate%20(GIH%20WR)">
          Games in Hand Win Rate
        </LinkOut>{" "}
        statistic and uses that distribution to assign a grade to each card. For
        example, a card with a win rate that is one standard deviation higher
        than the mean would get a B. Cards drawn fewer than 200 times are not
        included.
      </p>
      <p className="mb-4">
        You can hover over cards to see card previews and click on cards to get
        a breakdown of how well the card does in different archetypes.
      </p>
      <p>
        The source code for this site can be found on{" "}
        <LinkOut url="https://github.com/youssefm/limited-grades">
          GitHub
        </LinkOut>
        .
      </p>
    </div>
  </Modal>
);

export default AboutProjectModal;
