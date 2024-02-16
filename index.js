let wantedPN = '0730000000';
const puppeteer = require('puppeteer');
const InstanceEmail = 'cogewed863@laymro.com';
const InstancePassword = 'whatsapp2024!';
const instanceId = '5758';


(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({height: 1080, width: 1000});
  await page.goto(`https://waapi.app/account/instances/${instanceId}`);

  await page.type('#email',InstanceEmail);
  await page.type('#password',InstancePassword);
  await page.click('button[type="submit"]');
  
  const textInputHTML = 'input[wire\\:model\\.live="phoneNumber"][type="text"]';
  await page.waitForSelector(textInputHTML);
  const textInput = await page.$eval(textInputHTML, el => el.value);
  await page.click(textInputHTML);
  for (let i=0; i<textInput.length; ++i)
    await page.keyboard.press('Backspace');
  await page.type(textInputHTML, wantedPN);
  
  const saveBtn = 'button[wire\\:click="save"]';
  await page.waitForSelector(saveBtn);
  await page.click(saveBtn);
  await page.click(saveBtn);

  await page.evaluate(async () => {
    await new Promise(resolve => setTimeout(resolve, 10000));
  });

  await browser.close();
})();