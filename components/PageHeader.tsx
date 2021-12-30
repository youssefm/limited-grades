import { Col, Row } from "react-bootstrap";

const PageHeader = () => (
  <Row className="justify-content-center">
    <Col xl="6">
      <p>
        The table below uses{" "}
        <a
          href="https://www.17lands.com/card_ratings"
          target="_blank"
          rel="noreferrer"
        >
          17Lands
        </a>{" "}
        Premier Draft data to assign letter grades to cards. It infers a normal
        distribution from the{" "}
        <a
          href="https://www.17lands.com/metrics_definitions#:~:text=Games%20in%20Hand%20Win%20Rate%20(GIH%20WR)"
          target="_blank"
          rel="noreferrer"
        >
          Games in Hand Win Rate
        </a>{" "}
        statistic and uses that distribution to assign a grade to each card. For
        example, a card with a win rate that is one standard deviation higher
        than the mean would get a B. Cards drawn fewer than 200 times are not
        included.
      </p>
    </Col>
  </Row>
);

export default PageHeader;
