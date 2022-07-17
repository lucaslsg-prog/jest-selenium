const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByName = async (driver, name, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

describe('webdriver', () => {
  let driver;

  beforeAll(async () => {
    driver = new webdriver.Builder().forBrowser('chrome').build();
    await driver.get(`http://www.vanilton.net/triangulo/#`);
  }, 10000);

  afterAll(async () => {
    await driver.quit();
  }, 15000);

  test('test equilatero', async () => {
    const lnk = await getElementByName(driver, 'V1');
    await lnk.sendKeys('3');

    const lnk1 = await getElementByName(driver, 'V2');
    await lnk1.sendKeys('3');

    const lnk2 = await getElementByName(driver, 'V3');
    await lnk2.sendKeys('3');

    const submit = await getElementByXpath(driver, '/html/body/form/input[4]');
    await submit.click();

    const output = await getElementByXpath(
      driver,
      '/html/body/div[4]'
    );
    
    const outputVal = await output.getText();
    expect(outputVal).toEqual("Equilátero");
  }, 10000);

  test('test isosceles', async () => {
    const lnk = await getElementByName(driver, 'V1');
    await lnk.sendKeys('3');

    const lnk1 = await getElementByName(driver, 'V2');
    await lnk1.sendKeys('1');

    const lnk2 = await getElementByName(driver, 'V3');
    await lnk2.sendKeys('3');

    const submit = await getElementByXpath(driver, '/html/body/form/input[4]');
    await submit.click();

    const output = await getElementByXpath(
      driver,
      '/html/body/div[4]'
    );
    
    const outputVal = await output.getText();
    expect(outputVal).toEqual("Isósceles");
  }, 10000);

  test('test escaleno', async () => {
    const lnk = await getElementByName(driver, 'V1');
    await lnk.sendKeys('3');

    const lnk1 = await getElementByName(driver, 'V2');
    await lnk1.sendKeys('4');

    const lnk2 = await getElementByName(driver, 'V3');
    await lnk2.sendKeys('5');

    const submit = await getElementByXpath(driver, '/html/body/form/input[4]');
    await submit.click();

    const output = await getElementByXpath(
      driver,
      '/html/body/div[4]'
    );
    
    const outputVal = await output.getText();
    expect(outputVal).toEqual("Escaleno");
  }, 10000);

  test('test submit with empty fields', async () => {
    
    const submit = await getElementByXpath(driver, '/html/body/form/input[4]');
    await submit.click();
    const output = await getElementByXpath(
      driver,
      '/html/body'
    );
    const outputVal = await output.getText();
    expect(outputVal).toMatch('Digite os valores dos vértices do triângulo para identificar o seu tipo')
    
  }, 10000);

  test('triangle existence condition: side_A + side_B = side_C',async ()=>{
    const side_A = await getElementByName(driver, 'V1');
    await side_A.sendKeys('5');

    const side_B = await getElementByName(driver, 'V2');
    await side_B.sendKeys('5');

    const side_C = await getElementByName(driver, 'V3');
    await side_C.sendKeys('10');

    const submit = await getElementByXpath(driver, '/html/body/form/input[4]');
    await submit.click();

    const output = await getElementByXpath(
      driver,
      '/html/body/div[4]'
    );

    const outputVal = await output.getText();
    if(outputVal=="Isósceles"){
      console.log("PROPRIEDADE NÃO SATISFEITA")
    }
  });

  test('triangle existence condition: side_A + side_B < side_C', async ()=>{
    const side_A = await getElementByName(driver, 'V1');
    await side_A.sendKeys('5');

    const side_B = await getElementByName(driver, 'V2');
    await side_B.sendKeys('3');

    const side_C = await getElementByName(driver, 'V3');
    await side_C.sendKeys('10');

    const submit = await getElementByXpath(driver, '/html/body/form/input[4]');
    await submit.click();

    const output = await getElementByXpath(
      driver,
      '/html/body/div[4]'
    );

    const outputVal = await output.getText();
    if(outputVal=="Escaleno"){
      console.log("PROPRIEDADE NÃO SATISFEITA")
    }
  });
});
