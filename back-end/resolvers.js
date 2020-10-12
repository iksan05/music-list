const models = require("./models");

const resolvers = {
  Query: {
    musics: async () => {
      try {
        const musics = await models.Music.findAll({});
        return musics;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addMusic: async (parent, params) => {
      try {
        const music = await models.Music.create({
          title: params.addMusicInput.title,
          album: params.addMusicInput.album,
          artis: params.addMusicInput.artis,
          year: params.addMusicInput.year,
        });
        return music;
      } catch (error) {
        console.log(error);
      }
    },
    updateMusic: async (parent, params) => {
      try {
        const music = await models.Music.update(
          {
            title: params.updateMusicInput.title,
            album: params.updateMusicInput.album,
            artis: params.updateMusicInput.artis,
            year: params.updateMusicInput.year,
          },
          {
            where: {
              id: params.updateMusicInput.id,
            },
          }
        );
        if (music[0] === 1) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteMusic: async (parent, params) => {
      try {
        const music = await models.Music.destroy({
          where: {
            id: params.deleteMusicInput.id,
          },
        });
        if (music) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
