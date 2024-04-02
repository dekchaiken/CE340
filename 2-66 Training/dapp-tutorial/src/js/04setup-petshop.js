const getJsonPromisify = (jsonfile, options) => {
    return new Promise((resolve, reject) => {
      $.getJSON(jsonfile, options)
        .done((json) => resolve(json))
        .fail((...error) => reject(error));
    });
};

const setupPetshop = async () => {
    const petsRow = $("#petsRow");
    const petTemplate = $("#petTemplate");
    try {
      const pets = await getJsonPromisify('assets/data/pets.json');
      pets.map((pet) => {
        petTemplate.find(".card-title").text(pet.name);
        petTemplate.find("img").attr("src", "./assets/" + pet.picture);
        petTemplate.find(".pet-breed").text(pet.breed);
        petTemplate.find(".pet-age").text(pet.age);
        petTemplate.find(".pet-location").text(pet.location);
        petTemplate.find(".btn-buy").attr("data-id", pet.id);
        petsRow.append(petTemplate.html());
      });
    //   App.lastBlock = -1;
    //   return await App.start();
    } catch (err) {
      console.log(err);
    }
};

