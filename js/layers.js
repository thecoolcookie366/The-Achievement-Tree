addLayer("p", {
    name: "protons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    nodeStyle: {
        background: "linear-gradient(#00d2ff, #00458e, #0d011a)",
        backgroundOrigin: "border-box",
        borderColor: "rgba(0, 210, 255, 0.4)",
        color: "rgb(255, 255, 255)",
    },
    color: "#00ffcc",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "protons", // Name of prestige currency
    baseResource: "currencies", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal (1)
        return exp
    },
    branches:['e'],
    upgrades: {
        11: {
            title: "Beat the game.",
            description: "This is the end of the game!",
            cost: new Decimal(1),
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},


})