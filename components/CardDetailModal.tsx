import { sortBy } from "lodash";
import { Col, Modal, Row, Table } from "react-bootstrap";

import { DECK_LABELS } from "../lib/constants";
import { Card, Deck } from "../lib/types";

interface Props {
  card: Card | undefined;
  handleClose: () => void;
}

const CardDetailModal = (props: Props) => {
  const { card, handleClose } = props;

  if (!card) {
    return null;
  }

  return (
    <Modal
      show={card}
      onHide={handleClose}
      size="lg"
      centered
      animation={false}
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title>{card.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md="auto" className="align-self-center">
            <img src={card.cardUrl} alt={card.name} width="240" height="340" />
          </Col>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Win Rate</th>
                  <th>Grade</th>
                </tr>
                {sortBy(
                  Object.entries(card.stats),
                  ([deck, stats]) => -stats.gameCount
                ).map(([deck, stats]) => (
                  <tr key={deck}>
                    <th>{DECK_LABELS[deck as Deck]}</th>
                    <td>
                      {Number(stats.winrate).toLocaleString(undefined, {
                        style: "percent",
                        minimumFractionDigits: 1,
                      })}
                    </td>
                    <td>{stats.grade}</td>
                  </tr>
                ))}
              </thead>
            </Table>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CardDetailModal;
