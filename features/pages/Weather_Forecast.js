
var WeatherForecastValidation = function () {

  var chai = require('chai').use(require('chai-as-promised'));
  var expect = chai.expect;
  var moment = require('moment');


  this.setCityName = function (value) {
    element(by.xpath("//input[@id='city']")).sendKeys(value);
    element(by.xpath("//input[@id='city']")).sendKeys(protractor.Key.ENTER);
  };
  this.weatherforecast =  (value) =>{
    element.all(by.xpath("//span[@class='name']")).getText().then(function (text) {
      console.log('Weather forecast of following days------', text,' has been displayed');
      expect(text.length).to.equal(5);
      element(by.xpath("//h1[text()='Five Day Weather Forecast for']")).isDisplayed().then(function (boolean) {
        expect(boolean).to.equal(true);
      })
    })
  };

  this.hourlyforecast =  (value) =>{
    element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'hour\')]')).getText().then(function (text) {
      console.log('Weather forecast displayed for the following hours ------', text);
      text.sort((a,b) => {
        let timeDifference = a-b;
        // console.log(moment(timeDifference, 'hmm').format('hh:mm'));
        expect(moment(timeDifference, 'hmm').format('hh')).to.equal('03');
      })
    })
  };
  this.MinMaxtemp = (value) => {
    element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'maximum\')]')).getText().then(function (text) {
      var remArray = [];

      let stringi  = text.toString()
      let name = stringi.replace(/[^a-zA-Z0-9 ]/g, " ");
      let array = name.split("  ");
      array.map((data) => {
         remArray.push(parseInt(data.replace(/ +/g, "")));
      })
      remArray.sort((a,b) => {
        return a - b;
      })

      element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'maximum\')]/../../../../div[1]/span[3]/span[@class=\'rmq-5ea3c959 min\']')).getText().then(function (mintemp) {
        let tempMin = mintemp.toString()
        let tempMin_wo_SpecialCharacter = tempMin.replace(/[^a-zA-Z0-9 ]/g, "");
        // console.log('tempMin_wo_SpecialCharacter',tempMin_wo_SpecialCharacter)
        expect(tempMin_wo_SpecialCharacter).to.equal(remArray[0].toString())
      })
      element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'maximum\')]/../../../../div[1]/span[3]/span[@class=\'max\']')).getText().then(function (maxtemp) {
        let tempMax = maxtemp.toString()
        let tempMax_wo_SpecialCharacter = tempMax.replace(/[^a-zA-Z0-9 ]/g, "");
        // console.log('tempMax_wo_SpecialCharacter',tempMax_wo_SpecialCharacter)
        expect(tempMax_wo_SpecialCharacter).to.equal(remArray[remArray.length-1].toString())
      })
      console.log('Temperature details for the day ',text);
      console.log('Min Temperature------', Math.round(remArray[0]), 'Degree Celcius');
      console.log('Max Temperature------', Math.round(remArray[remArray.length-1]),'Degree Celcius');
    })
  };
  this.aggrgtRainfall = (value) =>{
    element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'rainfall\')]')).getText().then(function (text) {
      console.log('rainfall ',text)
      let stringi  = text.toString()
      let name = stringi.replace(/[^a-zA-Z0-9 ]/g, "");
      let new_array = name.split("mm");
      new_array.pop()
      // console.log(new_array)
      let count=0;
      new_array.map((data) => {
        count = count+parseInt(data)
      })
      console.log('Aggregate Rainfall is ',Math.round(count))
      element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'rainfall\')]/../../../../div[1]/span[5]/span[@class=\'rainfall\']')).getText().then(function (aggregate) {
        expect(aggregate.toString()).to.equal(count.toString().concat('mm'))
      })
    })
  };
  this.WindSpeed = (value) => {
    element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'speed\')]')).getText().then(function (text) {
      let stringi  = text.toString()
      let name = stringi.replace(/[^a-zA-Z0-9 ]/g, "");
      let new_array = name.split("kph");
      new_array.pop()
      console.log('wind speed',new_array)

      let sorted_arr = new_array.sort();
      let results = [];
      for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
          results.push(sorted_arr[i]);
        }
      }
      element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'speed\')]/../../../../div/span[4]/span[1][@class=\'speed\']')).getText().then(function (dominantwind) {
        console.log(dominantwind)
        console.log('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'speed\')]/../../../../div/span[4]/span[1][@class=\'speed\']')
        expect(dominantwind.toString()).to.equal(results[0].toString().concat('kph'))
      })
    })
  };

  this.WindDirection = (value) => {
    element(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'speed\')]/../../../../div/span[4]/span[@class=\'rmq-5ea3c959 direction\']/*')).getAttribute('style').then(function (style) {
      let rotate = 'rotate';
      let MeasurementInDegree = style.substring(style.indexOf(rotate)+rotate.length+1,style.length-2)
      console.log('MeasurementInDegree ',MeasurementInDegree)
        element(by.xpath('(//span[text()=\''+value+'\']/../../../div[2]/div/span/span[contains(@data-test,\'direction\')]/*)[1]')).getAttribute('style').then(function (style) {
          let child = 'rotate'
          let MeasurementInDegreeChild = style.substring(style.indexOf(child)+child.length+1,style.length-2)
          console.log('MeasurementInDegreeChild ',MeasurementInDegreeChild)
          expect(MeasurementInDegree).to.equal(MeasurementInDegreeChild)
        })
    })
  }

  this.dominantCondition = (value) => {
    element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span[2]/*[local-name() = "svg"]')).getAttribute('aria-label')
        .then((arr) => {
            var popArray = arr.sort((a,b) =>
                arr.filter(v => v===a).length
                - arr.filter(v => v===b).length
            ).pop();
            console.log(popArray.toString())
          console.log('The selected day weather conditions ',arr)
          console.log('The selected day is a ',popArray,' day')
          element.all(by.xpath('//span[text()=\''+value+'\']/../../../div[2]/div/span[2]/*[local-name() = "svg"]/../../../../div/span[2]/*[local-name() = "svg"]')).getAttribute('aria-label').then(function (dominantcondition) {
            console.log(dominantcondition)
            console.log('//span[text()=\''+value+'\']/../../../div[2]/div/span[2]/*[local-name() = "svg"]/../../../../div/span[2]/*[local-name() = "svg"]');
            expect(dominantcondition.toString()).to.equal(popArray.toString())
            console.log(dominantcondition)
          })
        })
  };
};

module.exports = WeatherForecastValidation;
