export const GetData = async ()=>{
    try {
        let URL = `https://swapi.dev/api/people`;
        const response = await fetch(URL);
        const data = response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}