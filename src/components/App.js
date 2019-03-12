import React, { Component } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext } from "react-beautiful-dnd";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

import { sort } from "../actions";

const listsQuery = gql`
  {
    lists {
      id
      title
      cards {
        text
        id
      }
    }
  }
`;

class App extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  render() {
    return (
      <Query query={listsQuery}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;
          console.log(data.lists);

          return (
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div>
                <h2>Hello Youtube</h2>
                <div style={styles.listsContainer}>
                  {data.lists.map(list => (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={list.cards}
                    />
                  ))}
                  <TrelloActionButton list />
                </div>
              </div>
            </DragDropContext>
          );
        }}
      </Query>
    );
  }
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row"
  }
};

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
