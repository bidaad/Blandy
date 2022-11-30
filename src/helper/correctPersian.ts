export function correctPersian(str: string)
{
        return str.replace('ي', 'ی').replace('ي', 'ی').replace('ى', 'ی').replace('ﻳ', 'ی').replace('ﻱ', 'ی').replace('ﻲ', 'ی').replace('ﻰ', 'ی').replace('ﻯ', 'ی').replace('ك', 'ک')
            .replace('٠', '۰').replace('١', '۱').replace('٢', '۲').replace('٣', '۳').replace('٤', '۴')
            .replace('٥', '۵').replace('٦', '۶').replace('٧', '۷').replace('٨', '۸').replace('٩', '۹');
}