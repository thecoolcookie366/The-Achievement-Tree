addLayer("p", {
    name: "protons",
    symbol: "P",
    position: 2,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        completedAchievements: []
    }},
    nodeStyle: {
        background: "linear-gradient(#00d2ff, #00458e, #0d011a)",
        backgroundOrigin: "border-box",
        borderColor: "rgba(0, 210, 255, 0.4)",
        color: "rgb(255, 255, 255)"
    },
    color: "#00ffcc",
    requires: new Decimal(1),
    resource: "protons",
    baseResource: "currencies",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        exp = new Decimal(1)
        return exp
    },
    branches:[''],
    row: 0,
    layerShown(){return true},
    update(diff) {
        let activeLayer = this.layer
        let list = layers[activeLayer].customAchievements
        if (!list) return
        Object.keys(list).forEach(key => {
            let ac = list[key]
            if (player[activeLayer].completedAchievements && !player[activeLayer].completedAchievements.includes(ac.id)) {
                if (typeof ac.done === "function" && ac.done()) {
                    player[activeLayer].completedAchievements.push(ac.id)
                }
            }
        })
    },
    customAchievements: {
        11: {
            name: "A start.",
            desc: "There is a 100% chance you get this. Yay!",
            rarity: 1,
            color: "#686868",
            icon: "●",
            id: "start",
            done() { return true }
        },
        21: {
            name: "An achievement!",
            desc: "Get at least one achievement.",
            rarity: 2,
            color: "#bcbcbc",
            icon: "◎",
            id: "ach01",
            done() { return player.p.completedAchievements.length >= 1 }
        },
        31: {
            name: " ",
            desc: " ",
            rarity: 1000,
            color: "#e33b3b",
            icon: "■",
            id: " ",
            done() { return player.p.points.gte(1) }
        },
        41: {
            name: " ",
            desc: " ",
            rarity: 10000,
            color: "#cf7a1d",
            icon: "⬠",
            id: " ",
            done() { return player.points.gte(100) }
        },
        51: {
            name: " ",
            desc: " ",
            rarity: 30000,
            color: "#8a13a3",
            icon: "⬢",
            id: " ",
            done() { return player.p.points.gte(10) }
        },
        61: {
            name: " ",
            desc: " ",
            rarity: 90000,
            color: "#14a377",
            icon: "◉",
            id: " ",
            done() { return player.points.gte(10000) }
        },
        71: {
            name: " ",
            desc: " ",
            rarity: 500000,
            color: "#c91ca3",
            icon: "❖",
            id: " ",
            done() { return player.p.points.gte(100) }
        },
        81: {
            name: " ",
            desc: " ",
            rarity: 1000000,
            color: "#a89519",
            icon: "✦",
            id: " ",
            done() { return player.points.gte(1e6) }
        },
        91: {
            name: " ",
            desc: " ",
            rarity: 7500000,
            color: "#54ab16",
            icon: "★",
            id: " ",
            done() { return player.p.points.gte(1000) }
        },
        101: {
            name: " ",
            desc: " ",
            rarity: 15000000,
            color: "#1669ab",
            icon: "✪",
            id: " ",
            done() { return player.points.gte(1e9) }
        },
        111: {
            name: " ",
            desc: " ",
            rarity: 50000000,
            color: "#a1ab16",
            icon: "✴",
            id: " ",
            done() { return player.p.points.gte(10000) }
        },
        121: {
            name: " ",
            desc: " ",
            rarity: 100000000,
            color: "#103c82",
            icon: "✵",
            id: " ",
            done() { return player.points.gte(1e12) }
        },
        131: {
            name: " ",
            desc: " ",
            rarity: 400000000,
            color: "#5b378c",
            icon: "❈",
            id: " ",
            done() { return player.p.points.gte(1e5) }
        },
        141: {
            name: " ",
            desc: " ",
            rarity: 800000000,
            color: "#4f1f4b",
            icon: "✸",
            id: " ",
            done() { return player.points.gte(1e15) }
        },
        151: {
            name: " ",
            desc: " ",
            rarity: 5000000000,
            color: "#437d77",
            is3DCube: true,
            id: " ",
            done() { return player.p.points.gte(1e6) }
        },
        161: {
            name: " ",
            desc: " ",
            rarity: 40000000000,
            color: "#9c1111",
            icon: "🕸",
            id: " ",
            done() { return false }
        },
        171: {
            name: " ",
            desc: " ",
            rarity: 200000000000,
            color: "#dedede",
            icon: "⚙",
            id: " ",
            done() { return false }
        },
        181: {
            name: "The end.",
            desc: "Obtain every other achievement. The fun is over, go find something to do now.",
            rewardDesc: "Unlock Bonus Achievements.",
            rarity: 0,
            color: "#360540",
            icon: "✹",
            id: "thend",
            done() { return false }
        }
    },
    tabFormat: [
        ["raw-html", function() {
            let htmlStr = `<div style="display: flex; flex-direction: column; gap: 6px; width: 100%; max-width: 600px; margin: 0 auto; text-align: left; font-family: monospace;">`
            let targetLayerObj = layers.p
            if (!targetLayerObj || !targetLayerObj.customAchievements) return ""
            let sortedAchievements = Object.values(targetLayerObj.customAchievements).sort((a, b) => {
                if (a.rarity === 0) return 1
                if (b.rarity === 0) return -1
                return a.rarity - b.rarity
            })
            sortedAchievements.forEach(ac => {
                let isObtained = player.p.completedAchievements ? player.p.completedAchievements.includes(ac.id) : false
                let chanceText = ac.rarity === 0 ? "Value: ∞<sup>*</sup>" : `Value: ${ac.rarity.toLocaleString()}`
                let statusText = isObtained ? "unlocked!" : "locked"
                let opacity = isObtained ? "1.0" : "0.25"
                
                let renderIcon = `<div style="font-size: 26px; width: 32px; text-align: center;">${ac.icon}</div>`
                if (ac.is3DCube) {
                    renderIcon = `
                    <div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${ac.color || '#fff'}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="12 2 22 7 22 17 12 22 2 17 2 7" />
                            <polyline points="2 7 12 12 22 7" />
                            <line x1="12" y1="12" x2="12" y2="22" />
                        </svg>
                    </div>`
                }

                let rewardText = ac.rewardDesc ? `<div style="font-size: 11px; color: #e6c229; margin-top: 2px; font-weight: bold;">Reward: ${ac.rewardDesc}</div>` : ""

                htmlStr += `
                <div style="display: flex; align-items: center; justify-content: space-between; background: #161616; border: 2px solid ${ac.color || '#fff'}; border-radius: 6px; padding: 8px 12px; color: ${ac.color || '#fff'}; opacity: ${opacity}; box-shadow: inset 0 0 10px rgba(0,0,0,0.6);">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        ${renderIcon}
                        <div>
                            <div style="font-size: 16px; font-weight: bold; text-shadow: 0 0 4px ${ac.color || '#fff'}33;">${ac.name}</div>
                            <div style="font-size: 12px; color: #aaaaaa; margin-top: 2px;">
                                ${chanceText} • <span style="color: ${isObtained ? '#4ef072' : '#888'}; font-weight: ${isObtained ? 'bold' : 'normal'}">${statusText}</span>
                            </div>
                            <div style="font-size: 11px; color: #777; margin-top: 1px; font-style: italic;">${ac.desc}</div>
                            ${rewardText}
                        </div>
                    </div>
                    <div style="text-align: right; font-size: 11px; color: #666; line-height: 1.3;">
                        <div>ID: ${ac.id}</div>
                    </div>
                </div>`
            })
            htmlStr += `</div>`
            return htmlStr
        }]
    ]
})
