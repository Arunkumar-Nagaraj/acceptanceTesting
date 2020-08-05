var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;
var sel = require('selenium-webdriver')

var WeatherFunctions = function () {

  var step_page = require(process.cwd()+'/features/pages/Weather_Forecast.js')
  var stepPage = new step_page();

  this.Given('Application is open', function () {
    browser.ignoreSynchronization = true;
    return browser.get('http://localhost:3000').then(function () {
      // callback();
    });
  });

  this.Given(/^I enter the (.*) and click on submit$/, function (city) {
    browser.findElement(by.xpath("//input[@id='city']")).clear();
    browser.findElement(by.xpath("//input[@id='city']")).sendKeys(city);
    browser.findElement(by.xpath("//input[@id='city']")).sendKeys(protractor.Key.ENTER);
  })

  this.Given(/^I enter the (.*) in upper case then click on submit$/, function (city) {
    browser.findElement(by.xpath("//input[@id='city']")).clear();
    browser.findElement(by.xpath("//input[@id='city']")).sendKeys(city.toUpperCase());
    browser.findElement(by.xpath("//input[@id='city']")).sendKeys(protractor.Key.ENTER);
  })

  this.Given(/^I should get the five day whether forecast$/, function () {
    browser.findElement(by.xpath("//h1[text()='Five Day Weather Forecast for']")).isDisplayed().then(function (boolean) {
        expect(boolean).to.equal(true)
     })
    stepPage.weatherforecast();
  })

  this.Given(/^I validate displayed forecast of the selected (.*) is in 3 hourly format$/, function (day) {
    stepPage.hourlyforecast(day)
  })
  this.Given(/^I validate the Minimum and maximum temperature of the selected (.*)$/, function (day) {
    stepPage.MinMaxtemp(day)
  })
  this.Given(/^I validate the aggregate rainfall of the selected (.*)$/, function (day) {
    stepPage.aggrgtRainfall(day)
  })
  this.Given(/^I validate the dominant condition of the selected (.*)$/, function (day) {
    stepPage.dominantCondition(day)
  })
  this.Given(/^I validate the wind speed of the selected (.*)$/, function (day) {
    stepPage.WindSpeed(day)
  })
  this.Given(/^I validate the current wind direction of the selected (.*)$/, function (day) {
    stepPage.WindDirection(day)
  })
  this.Given(/^I select a (.*) and I will get hourly forecast$/, function (day) {
    console.log('day is',day)
    let d = new Date();
    console.log('time ',d.getTime())
    browser.findElement(by.xpath('//span[text()=\''+day+'\']')).click();
    browser.sleep(2000)
    browser.findElement(by.xpath('//span[text()=\''+day+'\']/../../../div[2]')).isDisplayed().then(function (boolean) {
      expect(boolean).to.equal(true)
    })
    // stepPage.hourlyforecast(day)
    // stepPage.MinMaxtemp(day)
    // stepPage.aggrgtRainfall(day)
    // stepPage.dominantCondition(day)
    // stepPage.WindSpeed(day)
//     browser.pause()
  })

  this.Given(/^I hide the hourly forecast of the selected (.*)$/, function (day) {

    return browser.findElement(by.xpath('//span[text()=\''+day+'\']/../../../div[2]')).isDisplayed().then(function (bool) {
      if(bool){
        browser.findElement(by.xpath('//span[text()=\''+day+'\']')).click();
        browser.sleep(2000)
        browser.findElement(by.xpath('//span[text()=\''+day+'\']/../../../div[2]')).isDisplayed().then(function (boolean) {
          expect(boolean).to.equal(false)
        })
      }else {browser.findElement(by.xpath('//span[text()=\''+day+'\']/../../../div[2]')).isDisplayed().then(function (boolean) {
        expect(boolean).to.equal(false)
      })}
    })
  })
  this.Given(/^I enter an random city name (.*)$/, function (city) {
    browser.findElement(by.xpath("//input[@id='city']")).clear();
    browser.findElement(by.xpath("//input[@id='city']")).sendKeys(city);
    browser.findElement(by.xpath("//input[@id='city']")).sendKeys(protractor.Key.ENTER);
  })
  this.Given(/^I should get the message (.*)$/, function (err) {
      expect(element(by.xpath('//div[text()=\''+err+'\']')).isPresent()).to.become(true);
      return browser.findElement(by.xpath('//div[text()=\''+err+'\']')).getText().then(function (errText) {
      expect(err).to.equal(errText)
    })
  })
  this.Given(/^I refresh the page$/,function () {
    browser.refresh();
  })
  this.Given(/^I should get the default city name in input search field$/,function () {
    element(by.xpath('//input[@value=\'Glasgow\']')).isDisplayed().then(function (boolean) {
      expect(boolean).to.equal(true)
    })
  })
  this.Given(/^I submit without entering any input$/, function () {
    browser.$('#city').clear().then(function () {
      browser.sleep(2000);
      browser.findElement(by.xpath("//input[@id='city']")).sendKeys(protractor.Key.ENTER)
      browser.findElement(by.xpath("//input[@id='city']")).sendKeys(protractor.Key.CONTROL,"a");
      browser.findElement(by.xpath("//input[@id='city']")).sendKeys(protractor.Key.DELETE);
      browser.findElement(by.xpath("//input[@id='city']")).sendKeys(protractor.Key.ENTER)
      browser.sleep(2000);
    })
  })
};

module.exports = WeatherFunctions;