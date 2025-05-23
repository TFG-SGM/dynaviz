module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === "@types/multer") {
        pkg.dependencies = {
          ...pkg.dependencies,
          "@types/express": "^4.17.21",
        };
      }
      return pkg;
    },
  },
};
