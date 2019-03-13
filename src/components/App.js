import React, { Component } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import { sort } from "../actions";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
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
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <h2>Hello Youtube</h2>
              <ListsContainer>
                {lists.map((list, index) => (
                  <TrelloList
                    listID={list.id}
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                  />
                ))}
                <TrelloActionButton list />
              </ListsContainer>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
