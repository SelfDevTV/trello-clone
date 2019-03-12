import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_LIST = gql`
  mutation addList($title: String!) {
    addList(title: $title) {
      id
      title
      cards {
        text
        id
      }
    }
  }
`;

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

class TrelloActionButton extends React.Component {
  state = {
    formOpen: false,
    text: ""
  };
  1;

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddList = addList => {
    const { dispatch } = this.props;
    const { text } = this.state;

    console.log("i made it");

    if (!text) {
      return;
    }

    this.setState({
      text: ""
    });

    addList({ variables: { title: text } });
  };

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addCard(listID, text));
    }
  };

  renderAddButton = () => {
    const { list } = this.props;

    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };

  renderForm = addList => {
    const { list } = this.props;

    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";

    const buttonTitle = list ? "Add List" : "Add Card";

    // FIXME: Fix this mutation. It doesn't rerender
    return (
      <Mutation
        mutation={ADD_LIST}
        update={(cache, { data: { addList } }) => {
          const { lists } = cache.readQuery({ query: listsQuery });
          console.log("hihoooo", addList);
          cache.writeQuery({
            query: listsQuery,
            data: [...lists, addList]
          });
        }}
      >
        {addList => (
          <div>
            <Card
              style={{
                minHeight: 85,
                minWidth: 272,
                padding: "6px 8px 2px"
              }}
            >
              <Textarea
                placeholder={placeholder}
                autoFocus
                onBlur={this.closeForm}
                value={this.state.text}
                onChange={this.handleInputChange}
                style={{
                  resize: "none",
                  width: "100%",
                  overflow: "hidden",
                  outline: "none",
                  border: "none"
                }}
              />
            </Card>
            <div style={styles.formButtonGroup}>
              <Button
                onMouseDown={
                  list ? () => this.handleAddList(addList) : this.handleAddCard
                }
                variant="contained"
                style={{ color: "white", backgroundColor: "#5aac44" }}
              >
                {buttonTitle}{" "}
              </Button>
              <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
            </div>
          </div>
        )}
      </Mutation>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const styles = {
  openFormButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10
  },
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center"
  }
};

export default connect()(TrelloActionButton);
