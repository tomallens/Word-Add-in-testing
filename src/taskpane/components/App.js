import * as React from "react";
import PropTypes from "prop-types";
import { DefaultButton } from "@fluentui/react";
import Header from "./Header";
import HeroList from "./HeroList";
import Progress from "./Progress";
import Query from "./Query"
import openAIAPIKey from "../../config";
/* global Word, require */

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
      data: ''
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Design",
          primaryText: "Ask for analysis, proofreading, rewording or for similar examples",
        },
        {
          icon: "CannedChat",
          primaryText: "You can make a query as long as you like: 'Please summarise the following text: <pasted text>' is fine!",
        },
        {
          icon: "Lightbulb",
          primaryText: "Feel free to experiment with what I can do",
        },
      ],
    });
  }
  
  openaiFetchAPIResponse(prompt) {
    console.log("Calling GPT3 for: " + prompt);
    console.log("openAIAPIKey " + openAIAPIKey);
    console.log("Calling API");
    var url = "https://api.openai.com/v1/completions";
    var bearer = 'Bearer ' + openAIAPIKey
    var maxTokens = 2048;
    console.log("maxTokens " + maxTokens);
    //essentially maximum allowed as per OpenAI guidelines for this kind of work
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": prompt,
            "max_tokens": maxTokens,
        })
  
    }).then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);
       this.setState({
          data: responseJson
       })
  
    }).then(data => {
  
        console.log(data)
  
    }).catch(error => {
  
        console.log('Something bad happened ' + error)
  
    });
  }

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress
          title={title}
          logo={require("./../../../assets/logo-filled.png")}
          message="Please sideload your addin to see app body."
        />
      );
    }

    return (
      <div className="ms-welcome">
        <Header logo={require("./../../../assets/logo-filled.png")} title={this.props.title} message="Legal Lib AI" />
        <HeroList message="Make your query below:" items={this.state.listItems}>
        </HeroList>
        <Query></Query>
        <text>{this.state.data}</text>
      </div>
    );
  }
}

  // click = async () => {
  //   return Word.run(async (context) => {

  //     // insert a paragraph at the end of the document.
  //     const paragraph = context.document.body.insertParagraph("Hello World", Word.InsertLocation.end);

  //     // change the paragraph color to blue.
  //     paragraph.font.color = "blue";

  //     await context.sync();
  //   });
  // };

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};
