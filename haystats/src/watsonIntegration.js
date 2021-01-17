import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

function watson(URL, setSummary){
  // const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
  // const { IamAuthenticator } = require('ibm-watson/auth');

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
      apikey: '6dpL4JnV-ztfp_b5GooKwi7xvCxsR3VgfEQz7x-8VDfl',
    }),
    serviceUrl: 'https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/55fdcf04-ebf3-405c-81b3-28c5e797f1c1',
  });

  //consts
  const MAX_CATEGORY = 1;
  const MAX_CONCEPTS = 3;
  const MAX_KEYWORDS = 50;
  const MAX_ENTITIES = 50;

  const KEYWORD_REL_THRESHOLD = 0.7;
  const ENTITY_REL_THRESHOLD = 0.3;

  //`${URL}`
  //take out categories, concepts, entity
  const analyzeParams = {
    'url': `${URL}`,
    'returnAnalyzedText': true,
    'features': {
        'metadata' : {},
      'categories' : {
          'limit' : MAX_CATEGORY
      },
      'concepts': {
        'limit': MAX_CONCEPTS
      },
      'keywords' : {
          'limit' : MAX_KEYWORDS
      },
      'entities' : {
          //'mentions' : true,
          'limit' : MAX_ENTITIES
      }
    }
  };

  naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      //console.log(JSON.stringify(analysisResults, null, 2));
      
    var title = analysisResults["result"]["metadata"]["title"];
    
    var article_text = analysisResults["result"]["analyzed_text"];

    var categories = [];
    for(let item = 0; item < analysisResults["result"]["categories"].length; item++){
      categories[item] = analysisResults["result"]["categories"][item]["label"];
    }

    var concepts = [];
    for(let item = 0; item < analysisResults["result"]["concepts"].length; item++){
      concepts[item] = analysisResults["result"]["concepts"][item]["text"];
    }

    var keywords = [];
    for(let item = 0; item < analysisResults["result"]["keywords"].length; item++){
      if(analysisResults["result"]["keywords"][item]["relevance"] > KEYWORD_REL_THRESHOLD){
        keywords.push(analysisResults["result"]["entities"][item]["text"]);
      }
    }

    //add sentences

    //let sentences = str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    //let sentences = article_text.split(". ");
    let sentences = article_text.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);
    let statistics = [];

    let dataList = [];


    let stat_clue = [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelv",    // twelv on purpose
      "Thirt",   // thirt on purpose
      "Twenty",
      "fif",
      "First",
      "Second",
      "Third",
      "Ninth",
      "hundred",
      "thousand",
      "llion",
      "half",
      "quarter",
      "dozen",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "double",
      "triple",
      "quadruple",
      "halved",
      ];
  

  for (let sentence = 0; sentence < sentences.length; sentence++)
  {
    for (let clue = 0; clue < stat_clue.length; clue++)
    {
      if ( sentences[sentence].includes(stat_clue[clue]))
      {
        dataList.push(sentences[sentence]);
        clue = stat_clue.length;
      }
    }
  }
          
    let exportingInfo = {
      "title": `${title}`,
        "sections": [
        {
          "sectionTitle": "CATEGORY",
          "information": categories
        },
        { 
          "sectionTitle": "CONCEPTS",
          "information": concepts
        },
        {
          "sectionTitle": "DATA",
          "information": dataList
        }
      ]
    }
    
  
    setSummary(exportingInfo);
    })
    .catch(err => {
      console.log('error:', err);
    });

  //let list = article_text.split(". ");
}

export default watson;
