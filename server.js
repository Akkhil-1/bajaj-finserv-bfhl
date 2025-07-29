const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const isAlphabet = (char) => /^[a-zA-Z]$/.test(char);

const convertToAlternatingCaps = (inputString) => {
    return inputString
        .split('')
        .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
        .join('');
};

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "'data' must be an array."
        });
    }

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabetList = [];
    const specialCharList = [];
    let numberSum = 0;
    let combinedAlphabets = "";

    data.forEach(element => {
        const item = String(element);
        const parsedNumber = Number(item);

        if (!isNaN(parsedNumber)) {
            if (parsedNumber % 2 === 0) {
                evenNumbers.push(item);
            } else {
                oddNumbers.push(item);
            }
            numberSum += parsedNumber;
        } else if (item.length === 1 && isAlphabet(item)) {
            alphabetList.push(item.toUpperCase());
            combinedAlphabets += item;
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabetList.push(item.toUpperCase());
            combinedAlphabets += item;
        } else {
            specialCharList.push(item);
        }
    });

    const reversedAlphabets = combinedAlphabets.split('').reverse().join('');
    const alternateCapsString = convertToAlternatingCaps(reversedAlphabets);

    const payload = {
        is_success: true,
        user_id: "akhil_acharya_26112002",
        email: "akhil1216.be22@chitkara.edu.in",
        roll_number: "2210991216",
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabetList,
        special_characters: specialCharList,
        sum: String(numberSum),
        concat_string: alternateCapsString
    };

    res.status(200).json(payload);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
