const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const isLetter = (char) => /^[a-zA-Z]$/.test(char);
const isDigit = (char) => /^[0-9]$/.test(char);
const toAlternatingCaps = (str) => {
    return str
        .split('')
        .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
        .join('');
};
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Input 'data' must be an array."
        });
    }

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    let allAlphabetsConcat = "";

    data.forEach(item => {
        const strItem = String(item);
        const num = Number(strItem);

        if (!isNaN(num)) {
            if (num % 2 === 0) {
                evenNumbers.push(strItem);
            } else {
                oddNumbers.push(strItem);
            }
            sum += num;
        } else if (strItem.length === 1 && isLetter(strItem)) {
            alphabets.push(strItem.toUpperCase());
            allAlphabetsConcat += strItem;
        } else if (/^[a-zA-Z]+$/.test(strItem)) {
            alphabets.push(strItem.toUpperCase());
            allAlphabetsConcat += strItem;
        } else {
            specialCharacters.push(strItem);
        }
    });

    const reversedConcat = allAlphabetsConcat.split('').reverse().join('');
    const concat_string = toAlternatingCaps(reversedConcat);
    const response = {
        is_success: true,
        user_id: "akhil_acharya",
        email: "akhil1216.be22@chitkara.edu.in",
        roll_number: "2210991216",
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialCharacters,
        sum: String(sum),
        concat_string: concat_string
    };

    res.status(200).json(response);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
