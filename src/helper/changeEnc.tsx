const changeEnc = (str: string | undefined) => {
    if(str === undefined)
        return '';
    var Result: string = '';
    for (let i = 0; i < str.length; i++) {
        const CurChar = str.substr(i, 1);
        switch (CurChar) {
            case "0":
                Result += "۰";
                break;
            case "1":
                Result += "۱";
                break;
            case "2":
                Result += "۲";
                break;
            case "3":
                Result += "۳";
                break;
            case "4":
                Result += "۴";
                break;
            case "5":
                Result += "۵";
                break;
            case "6":
                Result += "۶";
                break;
            case "7":
                Result += "۷";
                break;
            case "8":
                Result += "۸";
                break;
            case "9":
                Result += "۹";
                break;
            default:
                Result += CurChar;
                break;
        }

    }
    return Result;
}

export default changeEnc;
