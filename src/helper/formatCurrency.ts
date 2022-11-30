import changeEnc from "./changeEnc";

const formatAndEncCurrency = (Price: any) => {
    
    if (Price === null)
        return "";
    try
    {
        Price = Price.toString().replace(" ", "");
        var Result:string = "";
        if (Price !== "")
        {
            while (Price.length > 3)
            {
                if (Result === "")
                    Result = Price.substr(Price.length - 3, 3);
                else
                    Result = Price.substr(Price.length - 3, 3) + "/" + Result;
                Price = Price.substr(0, Price.length - 3);
            }
        }
        if (Result !== "")
            Result = Price + "/" + Result;

        if (Result === "")
            Result = Price;
        Result = changeEnc(Result);
        return Result;

    }
    catch (e)
    {
        console.log(e);
        
        return Price;
    }
}

export default formatAndEncCurrency;
