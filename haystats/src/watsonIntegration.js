const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: '6dpL4JnV-ztfp_b5GooKwi7xvCxsR3VgfEQz7x-8VDfl',
  }),
  serviceUrl: 'https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/55fdcf04-ebf3-405c-81b3-28c5e797f1c1',
});

//take out categories, concepts, entity
const analyzeParams = {
  'url': 'https://www.investors.com/market-trend/stock-market-today/dow-jones-futures-biden-stimulus-buzz-wanes-stock-market-rally-tesla-stock/',
  'returnAnalyzedText': true,
  'features': {
    'categories' : {
        'limit' : 3
    },
    'concepts': {
      'limit': 3
    },
    'keywords' : {
        'limit' :3
    },
    'entities' : {
        //'mentions' : true,
        'limit' : 30
    }
  }
};

info = new String();
naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    //console.log(JSON.stringify(analysisResults, null, 2));
    
    info = analysisResults["result"]["analyzed_text"];
    console.log(info);
    /*
    for(let item = 0; item < analysisResults["result"]["entities"].length; item++){
        
        if(analysisResults["result"]["entities"][item]["type"] == "Quantity"){
            console.log( analysisResults["result"]["entities"][item]["text"]);
        }
        
    }
    */
  
    //info = JSON.stringify(analysisResults.keywords, null, 2);
    //console.log(info);
  })
  .catch(err => {
    console.log('error:', err);
  });



console.log(info);
let list = info.split(". ");
