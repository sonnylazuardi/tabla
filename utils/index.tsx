import { format } from 'date-fns';


export const renderGreetings = (text: string) => {
    const greet = format(new Date(), "aaaaa'm'").toLowerCase() === 'am' ? 'morning' : 'afternoon';
    return text.replace('{greetings}', `Good ${greet}`);
}