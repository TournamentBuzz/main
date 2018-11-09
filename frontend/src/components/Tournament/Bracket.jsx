import React from "react";
import { withRouter } from "react-router-dom";
import { Bracket } from "react-tournament-bracket";

class TournamentBracket extends React.Component {
  render() {
    const gameTestObj = {
      id: "matchId 1",
      name: "matchName 1",
      scheduled: Date.now(),
      sides: {
        home: {
          score: { score: 0 },
          seed: {
            displayName: "seed 3",
            rank: 1,
            sourceGame: {
              id: "matchId 2",
              name: "matchName",
              scheduled: Date.now(),
              sides: {
                home: {
                  score: { score: 10 },
                  seed: {
                    displayName: "seed 4",
                    rank: 2,
                    sourceGame: {
                      id: "matchId 4",
                      name: "matchName",
                      scheduled: Date.now(),
                      sides: {}
                    }
                  },
                  team: {
                    id: "teamId 1",
                    name: "teamName 1"
                  }
                },
                visitor: {
                  score: { score: 0 },
                  seed: {
                    displayName: "seed 5",
                    rank: 2,
                    sourceGame: {
                      id: "matchId 5",
                      name: "matchName",
                      scheduled: Date.now(),
                      sides: {}
                    }
                  },
                  team: {
                    id: "teamId 3",
                    name: "teamName 3"
                  }
                }
              }
            }
          },
          team: {
            id: "teamId 1",
            name: "teamName 1"
          }
        },
        visitor: {
          score: { score: 1 },
          seed: {
            displayName: "seed 2",
            rank: 1,
            sourceGame: {
              id: "matchId 3",
              name: "matchName",
              scheduled: Date.now(),
              sides: {
                home: {},
                visitor: {}
              }
            }
          },
          team: {
            id: "teamId 2",
            name: "teamName 2"
          }
        }
      }
    };
    return <Bracket game={gameTestObj} />;
  }
}

export default withRouter(TournamentBracket);
