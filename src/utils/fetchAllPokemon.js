// utils/fetchAllPokemon.js
export async function fetchAllPokemon(
  limit = 980,
  batchSize = 50,
  delay = 300
) {
  const cached = localStorage.getItem("pokeList");
  if (cached) return JSON.parse(cached);

  const allResults = [];

  // 1. Fetch lista base
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await res.json();
  const urls = data.results.map((p) => p.url);

  // 2. Funzione per ricavare la generazione
  function getGen(genUrl) {
    const arr = genUrl.split("");
    const filteredArray = arr.filter((f) => f !== "/");
    return filteredArray[filteredArray.length - 1];
  }

  // 3. Loop a batch
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (url) => {
        try {
          const detailRes = await fetch(url);
          const poke = await detailRes.json();

          const speciesRes = await fetch(poke.species.url);
          const species = await speciesRes.json();

          return {
            id: poke.id,
            name: poke.name,
            types: poke.types.map((t) => t.type.name),
            image: poke.sprites.front_default,
            image2: poke.sprites.back_default,
            image3: poke.sprites.front_shiny,
            image4: poke.sprites.back_shiny,
            height: poke.height,
            weight: poke.weight,
            base_experience: poke.base_experience,
            abilities: poke.abilities.map((a) => ({
              name: a.ability.name,
              is_hidden: a.is_hidden,
            })),
            stats: poke.stats.map((s) => ({
              name: s.stat.name,
              base_stat: s.base_stat,
            })),
            cry: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${poke.id}.ogg`,
            eggGroup: species.egg_groups,
            gen: getGen(species.generation.url),
            isLegendary: species.is_legendary,
            isMythical: species.is_mythical,
          };
        } catch (err) {
          console.warn("Errore su un Pokémon:", err);
          return null;
        }
      })
    );

    allResults.push(
      ...results.filter(
        (poke) =>
          poke &&
          typeof poke.id === "number" &&
          poke.id <= limit &&
          !poke.name.includes("-")
      )
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  localStorage.setItem("pokeList", JSON.stringify(allResults));
  return allResults;
}
