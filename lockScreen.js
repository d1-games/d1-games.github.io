// test 
document.addEventListener("DOMContentLoaded", function () {
    const encodedPasscode = 'MTk4Mw==';

    function decodePasscode(encoded) {
        return atob(encoded);
    }

    function sendToDiscord(username, passcode, isCorrect) {
        const webhookUrl = 'https://discord.com/api/webhooks/1304619821786333245/-K2pF3FktNU6JocVGKj7CGf3EoTMRyFMErVpJjQtfxw7c50nySGTgABIrXxntWxGJeS2';
        let data;

        if (isCorrect) {
            data = {
                embeds: [
                    {
                        description: `**Login Information:**\n\n\`Name:\` ${username}`,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1273433617212772394/1304618946628030504/D1GamesLogo.png?ex=67300c93&is=672ebb13&hm=f63b153a6e51226f5f4313b9acd95c3ab61289102dbc7fdb7cf77736ac18ddfb&'
                        }
                    }
                ]
            };
        } else {
            data = {
                content: "<@1269088910768734334>",
                embeds: [
                    {
                        description: `**Incorrect Login Information:**\n\n\`Name:\` ${username}\n\`Password Entered:\` ${passcode}`,
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/1273433617212772394/1304618946628030504/D1GamesLogo.png?ex=67300c93&is=672ebb13&hm=f63b153a6e51226f5f4313b9acd95c3ab61289102dbc7fdb7cf77736ac18ddfb&'
                        }
                    }
                ]
            };
        }

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error));
    }

    function checkPasscode() {
        const username = document.getElementById('username').value;
        const enteredPasscode = document.getElementById('passcode').value;
        const correctPasscode = decodePasscode(encodedPasscode);

        if (enteredPasscode === correctPasscode) {
            sessionStorage.setItem('loggedIn', 'true');
            sendToDiscord(username, enteredPasscode, true);
            document.getElementById('passcode').classList.add('hidden');
            document.getElementById('username').classList.add('hidden');
            document.getElementById('submit-btn').classList.add('hidden');
            setTimeout(() => {
                document.getElementById('content').style.display = 'flex';
                setTimeout(() => {
                    document.getElementById('content').classList.remove('hidden');
                }, 0);
            }, 0);
        } else {
            sendToDiscord(username, enteredPasscode, false);
            alert('Incorrect Password was Entered.');
        }
    }

    function checkLoginStatus() {
        if (sessionStorage.getItem('loggedIn') !== 'true') {
            document.getElementById('passcode').style.display = 'flex';
            document.getElementById('username').classList = 'flex';
            document.getElementById('submit-btn').style.display = 'flex';
            document.getElementById('content').style.display = 'none';
        } else {
            document.getElementById('passcode').style.display = 'none';
            document.getElementById('username').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'none';
            document.getElementById('content').style.display = 'flex';
        }
    }

    document.getElementById('submit-btn').addEventListener('click', checkPasscode);

    checkLoginStatus();
});
