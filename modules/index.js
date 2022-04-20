const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Sailor {
    constructor() {
        this.round = null;
        this.kakaoEmail = null;
        this.kakaoPassword = null;
        this.insertRound();
    }

    insertRound() {
        rl.question("항해 기수를 입력해주세요!", (input) => {
            console.log(typeof +input);
            if (typeof +input === "number") {
                this.round = input;
                this.insertKakaoEmail();
            } else {
                console.log("숫자만 입력해주세요");
                rl.close();
            }
        });
    }

    insertKakaoEmail() {
        rl.question("카카오 이메일을 입력해주세요!", (input) => {
            if (typeof input === "string") {
                this.kakaoEmail = input;
                this.insertKakaoPassword();
            } else {
                console.log("이메일 형식에 맞게 입력해주세요!");
                rl.close();
            }
        });
    }

    insertKakaoPassword() {
        rl.question("카카오 비밀번호를 입력해주세요!", (input) => {
            this.kakaoPassword = input;
            console.log(this);
        });
    }
}

module.exports = {
    Sailor,
};
