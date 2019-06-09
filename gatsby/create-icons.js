const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function ensureIconFolders(workshops) {
  return Promise.all(
    workshops.map(
      workshop =>
        new Promise((fulfill, reject) => {
          const iconFolder = path.join(`public`, workshop.contentId);

          if (fs.existsSync(iconFolder)) {
            fulfill();
          } else {
            fs.mkdir(iconFolder, err => {
              if (err) {
                return reject(err);
              }

              fulfill();
            });
          }
        })
    )
  );
}

const iconSizes = [16, 32, 64];

function generateIcons(workshops) {
  return Promise.all(
    workshops.map(workshop => {
      return Promise.all(
        iconSizes.map(size => {
          const imgPath = path.join(
            `public`,
            workshop.contentId,
            `icon-${size}x${size}.png`
          );

          const density = Math.min(2400, Math.max(1, size));

          return sharp(workshop.iconFile, { density })
            .resize({
              width: size,
              height: size,
              fit: `contain`,
              background: { r: 255, g: 255, b: 255, alpha: 0 },
            })
            .toFile(imgPath);
        })
      );
    })
  );
}

module.exports = async function createIcon({ getNodesByType }) {
  const workshops = getNodesByType('WorkshopsJson');
  const workshopsWithIcon = workshops.filter(workshop => !!workshop.iconFile);

  await ensureIconFolders(workshopsWithIcon);
  await generateIcons(workshopsWithIcon);
};
