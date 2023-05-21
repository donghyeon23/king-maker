const readline = require('readline');
const { Builder, By, until } = require('selenium-webdriver');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Sailor {
    constructor() {
        this.inputStatus = false;
        this.round = null;
        this.kakaoEmail = null;
        this.kakaoPassword = null;
        this.insertRound();
    }

    insertRound() {
        rl.question('항해 기수를 입력해주세요!', (input) => {
            if (typeof +input === 'number') {
                this.round = input;
                this.insertKakaoEmail();
            } else {
                console.log('숫자만 입력해주세요');
                rl.close();
            }
        });
    }

    insertKakaoEmail() {
        rl.question('카카오 이메일을 입력해주세요!', (input) => {
            if (typeof input === 'string') {
                this.kakaoEmail = input;
                this.insertKakaoPassword();
            } else {
                console.log('이메일 형식에 맞게 입력해주세요!');
                rl.close();
            }
        });
    }

    insertKakaoPassword() {
        rl.question('카카오 비밀번호를 입력해주세요!', (input) => {
            this.kakaoPassword = input;
            this.inputStatus = true;
        });
    }
}

class KingMaker {
    constructor(sailor) {
        this.sailor = sailor;
        this.checkOutTime = null;
        this.checkInTime = null;
        this.chromeOptions = null;
        this.setChromeOptions();
    }

    setChromeOptions() {
        const chrome = require('selenium-webdriver/chrome');
        const options = new chrome.Options();

        options.addArguments('--headless');

        this.chromeOptions = options;
    }

    async logIn() {
        let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(this.chromeOptions)
            .build();

        await driver.get(`https://hanghae99.spartacodingclub.kr/round/${this.sailor.round}/checks`);
        await driver.wait(until.elementLocated(By.css('#footer')));

        const loginBtn = await driver.findElement(By.xpath('/html/body/main/section[2]/button'));
        await loginBtn.click();

        await driver.wait(
            until.elementLocated(By.xpath('//*[@id="login-form"]/fieldset/div[8]/button[1]'))
        );

        await driver.executeScript(`
    document.querySelector('#id_email_2').value = '${this.sailor.kakaoEmail}';
    document.querySelector('#id_password_3').value = '${this.sailor.kakaoPassword}';
    `);

        const loginBtn2 = await driver.findElement(
            By.xpath('//*[@id="login-form"]/fieldset/div[8]/button[1]')
        );
        await loginBtn2.click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="rank-table"]')));
        
        return driver
    }

    async checkIn() {
        const driver = this.LogIn()
        const checkInBtn = await driver.findElement(By.xpath('//*[@id="timer"]/div/div[2]/div[1]'));
        await checkInBtn.click();

        console.log('check in complete!', new Date().toLocaleString());
        await driver.quit();
    }

    async checkOut() {
        const driver = this.LogIn()
        const checkOutBtn = await driver.findElement(
            By.xpath('//*[@id="timer"]/div/div[2]/div[2]')
        );
        await checkOutBtn.click();

        console.log('check out complete!', new Date().toLocaleString());
        await driver.quit();
    }
}

module.exports = {
    Sailor,
    KingMaker,
};
