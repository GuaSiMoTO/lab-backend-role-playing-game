const API = "http://localhost:3000/api";

//PERSONAJES

export default getCharacters = async () =>{
    const res = await fetch(`${API}/personajes`);
    return res.json();
};

export const createCharacter = async (data) =>{
    const res = await fetch(`${API}/personajes/manual`,{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
    })
    return res.json();
};


export const createRandom = async ()=> {
    const res = await fetch(`${API}/personajes/random`,{
    method: "POST"
    })
    return res.json();
};

//COMBATE

export const combate = async (id1, id2) => {
    const res = await fetch(`${API}/combate/${id1}/${id2}`, {
        method: "POST"
    });
    return res.json();
};