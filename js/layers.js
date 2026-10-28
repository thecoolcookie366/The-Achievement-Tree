addLayer("p", {
    name: "protons",
    symbol: "P",
    position: 2,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        completedAchievements: []
    }},
    tooltip() {
        return "Protons<br> " + player.p.completedAchievements.length + " Achievements"
    },
    nodeStyle: {
        background: "linear-gradient(#00d2ff, #00458e, #0d011a)",
        backgroundOrigin: "border-box",
        borderColor: "rgba(0, 210, 255, 0.4)",
        color: "rgb(255, 255, 255)"
    },
    color: "#00ffcc",
    requires: new Decimal("(e^1.796e308)2"),
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

        if (!window.hasRightClickContainerSetup) {
            window.hasRightClickContainerSetup = true
            window.addEventListener('contextmenu', function () {
                if (player && player.p && player.p.completedAchievements && !player.p.completedAchievements.includes("rclik")) {
                    player.p.completedAchievements.push("rclik")
                }
            })
            window.addEventListener('click', function (e) {
                let halfWidth = window.innerWidth / 2
                if (e.clientX > halfWidth) {
                    if (player && player.p && player.p.completedAchievements && !player.p.completedAchievements.includes("rclik")) {
                        player.p.completedAchievements.push("rclik")
                    }
                }
            })
        }

        Object.keys(list).forEach(key => {
            let ac = list[key]
            if (player[activeLayer].completedAchievements && !player[activeLayer].completedAchievements.includes(ac.id)) {
                if (ac.isClickAch) return
                if (ac.isRNG) {
                    let canRoll = true
                    if (ac.reqId && !player[activeLayer].completedAchievements.includes(ac.reqId)) {
                        canRoll = false
                    }
                    if (canRoll && Math.random() < (1 / ac.chancePerSec) * diff) {
                        player[activeLayer].completedAchievements.push(ac.id)
                    }
                } else {
                    if (typeof ac.done === "function" && ac.done()) {
                        player[activeLayer].completedAchievements.push(ac.id)
                        if (ac.id === "begin") {
                            save()
                            window.location.reload()
                        }
                    }
                }
            }
        })
    },
    customAchievements: {
        1: {
            name: "A start.",
            desc: "There is a 100% chance you get this. Yay!",
            rarity: 1,
            color: "#4f4f4f",
            icon: "●",
            id: "start",
            done() { return true }
        },
        2: {
            name: "An achievement!",
            desc: "Get at least one achievement.",
            rarity: 2,
            color: "#858585",
            icon: "◎",
            id: "ach01",
            done() { return player.p.completedAchievements.length >= 1 }
        },
        3: {
            name: "Lucky",
            desc: "A 1/10 chance to get this per second.",
            rarity: 20,
            color: "#858585",
            icon: "◎",
            id: "rng1",
            isRNG: true,
            chancePerSec: 10
        },
        4: {
            name: "Quite lucky",
            desc: "A 1/50 chance to get this per second when you have 'Lucky' unlocked.",
            rarity: 80,
            color: "#858585",
            icon: "◎",
            id: "rng2",
            isRNG: true,
            chancePerSec: 50,
            reqId: "rng1"
        },
        5: {
            name: "Very lucky",
            desc: "1/250 chance to get this per second when you have 'Quite lucky' unlocked.",
            rarity: 320,
            color: "#858585",
            icon: "◎",
            id: "rng3",
            isRNG: true,
            chancePerSec: 250,
            reqId: "rng2"
        },
        6: {
            name: "Remember to keep a backup",
            desc: "Export your save.",
            rarity: 4,
            rewardDesc: "Unlock an input box.",
            color: "#858585",
            icon: "◎",
            id: "bakup",
        },
        7: {
            name: "Follow instructions",
            desc: "Do what the man said.",
            rarity: 308,
            color: "#858585",
            icon: "◎",
            id: "ins",
        },
        8: {
            name: "Made the Right Click/Tap",
            desc: "Tap on the right side of the screen or right click.",
            rarity: 3,
            color: "#858585",
            icon: "◎",
            id: "rclik",
        },
        9: {
            name: "Achievement Unlocked 4",
            desc: 'Type "elephant" in the input.',
            rarity: 8,
            color: "#858585",
            icon: "◎",
            id: "achun",
        },
        10: {
            name: "Morse",
            desc: 'Type ".- -.-. .... .. . ...- . -- . -. - ..." somewhere.',
            rarity: 222,
            color: "#858585",
            icon: "◎",
            id: "ms4ac",
        },
        11: {
            name: "Insanely lucky",
            desc: "1/5000 chance to get this per second when you have 'Very lucky' unlocked.",
            rarity: 2560,
            color: "#e33b3b",
            icon: "■",
            id: "rng4",
            isRNG: true,
            chancePerSec: 5000,
            reqId: "rng3"
        },
        12: {
            name: "What the!",
            desc: "Don't act like you don't know what you inputted... Hint: Add the digits of the value, multiply by 3 and add 4, then input that.",
            rarity: 14916,
            color: "#cf7a1d",
            icon: "⬠",
            id: "what",
        },
        13: {
            name: " ",
            desc: " ",
            rarity: 30000,
            color: "#8a13a3",
            icon: "⬢",
            id: " ",
        },
        14: {
            name: " ",
            desc: " ",
            rarity: 90000,
            color: "#14a377",
            icon: "◉",
            id: " ",
        },
        15: {
            name: " ",
            desc: " ",
            rarity: 500000,
            color: "#c91ca3",
            icon: "❖",
            id: " ",
        },
        16: {
            name: " ",
            desc: " ",
            rarity: 1000000,
            color: "#a89519",
            icon: "✦",
            id: " ",
        },
        17: {
            name: " ",
            desc: " ",
            rarity: 7500000,
            color: "#54ab16",
            icon: "★",
            id: " ",
        },
        18: {
            name: " ",
            desc: " ",
            rarity: 15000000,
            color: "#1669ab",
            icon: "✪",
            id: " ",
        },
        19: {
            name: " ",
            desc: " ",
            rarity: 50000000,
            color: "#c8d424",
            icon: "✴",
            id: " ",
        },
        20: {
            name: " ",
            desc: " ",
            rarity: 100000000,
            color: "#103c82",
            icon: "✵",
            id: " ",
        },
        21: {
            name: " ",
            desc: " ",
            rarity: 400000000,
            color: "#5b378c",
            icon: "❈",
            id: " ",
        },
        22: {
            name: " ",
            desc: " ",
            rarity: 800000000,
            color: "#4f1f4b",
            icon: "✸",
            id: " ",
        },
        23: {
            name: " ",
            desc: " ",
            rarity: 5000000000,
            color: "#437d77",
            is3DCube: true,
            id: " ",
        },
        24: {
            name: " ",
            desc: " ",
            rarity: 40000000000,
            color: "#620f0f",
            icon: "▲",
            id: " ",
        },
        25: {
            name: "Scripter",
            desc: "What would a scripter do?",
            rarity: 222222222222,
            color: "#dedede",
            icon: "⚙",
            id: "scipt",
        },
        26: {
            name: "The end.",
            desc: "Obtain every other achievement.",
            rewardDesc: "Unlock Loops on the main tree. (soon)",
            rarity: Infinity,
            color: "#360540",
            icon: "✹",
            id: "thend",
            done() { return false }
        },
        27: {
            name: "The start...?",
            desc: "Have exactly -1 achievements at once. Wait, what?",
            rewardDesc: "Unlock the Input Box++. (soon)",
            rarity: 0,
            color: "#360540",
            icon: "✹",
            id: "thart",
            done() { return false }
        },
        28: {
            name: "Hippopotomonstrosesquippedaliophobia",
            desc: "Type the longest word (pneumonoultramicroscopicsilicovolcanoconiosis) in the input.",
            rarity: 1050,
            color: "#e33b3b",
            icon: "■",
            id: "longw",
        },
        29: {
            name: "The True Beginning",
            desc: "Get at least 10 achievements.",
            rewardDesc: "Unlock a new layer.",
            rarity: 1001,
            color: "#e33b3b",
            icon: "■",
            id: "begin",
            done() { return player.p.completedAchievements.length >= 10 }
        },
        30: {
            name: "42",
            desc: "Import the meaning of life.",
            rarity: 42,
            color: "#858585",
            icon: "◎",
            id: "42",
        },
        31: {
            name: "Nostalgia",
            desc: 'You feel like playing it again. Import a save from the oldest game by [name]366.',
            rarity: 366,
            color: "#858585",
            icon: "◎",
            id: "old",
        },
        32: {
            name: "Overload",
            desc: "Input overload. No, not literally!",
            rarity: 1200,
            color: "#e33b3b",
            icon: "■",
            id: "int",
        },
        33: {
            name: "No, this does nothing. Wait...",
            desc: "Repeated attempts does make something work??",
            rarity: 1500,
            color: "#e33b3b",
            icon: "■",
            id: "try",
        },
        34: {
            name: "Knife's edge",
            desc: "Be careful.",
            rarity: 1750,
            color: "#e33b3b",
            icon: "■",
            id: "woah",
        },
    },
    tabFormat: [
        ["raw-html", function() {
            let htmlStr = `<div style="display: flex; flex-direction: column; gap: 6px; width: 100%; max-width: 600px; margin: 0 auto; text-align: left; font-family: monospace;">`
            let targetLayerObj = layers.p
            if (!targetLayerObj || !targetLayerObj.customAchievements) return ""
            let sortedAchievements = Object.values(targetLayerObj.customAchievements).sort((a, b) => {
                let aVal = a.rarity === Infinity ? 9e20 : a.rarity
                let bVal = b.rarity === Infinity ? 9e20 : b.rarity
                if (aVal === 0) return 1
                if (bVal === 0) return -1
                return aVal - bVal
            })
            sortedAchievements.forEach(ac => {
                let isObtained = player.p.completedAchievements ? player.p.completedAchievements.includes(ac.id) : false
                let chanceText = (ac.rarity === 0 || ac.rarity === Infinity) ? "Value: ∅" : `Value: ${ac.rarity.toLocaleString()}`
                let statusText = isObtained ? "unlocked!" : "locked"
                let opacity = isObtained ? "1.5" : "0.5"
                
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
                let acKey = Object.keys(targetLayerObj.customAchievements).find(k => targetLayerObj.customAchievements[k].id === ac.id) || ac.id
                let clickAction = ac.isClickAch ? `onclick="layers.p.customAchievements[${acKey}].click()"` : ""
                let glowStyle = ac.isClickAch ? `onmouseenter="this.style.boxShadow='0 0 12px ${ac.color || '#fff'}', inset 0 0 10px rgba(0,0,0,0.6)'; this.style.filter='brightness(1.15)'" onmouseleave="this.style.boxShadow='inset 0 0 10px rgba(0,0,0,0.6)'; this.style.filter='none'"` : ""

                htmlStr += `
                <div ${glowStyle} ${clickAction} style="display: flex; align-items: center; justify-content: space-between; background: #161616; border: 2px solid ${ac.color || '#fff'}; border-radius: 6px; padding: 8px 12px; color: ${ac.color || '#fff'}; opacity: ${opacity}; box-shadow: inset 0 0 10px rgba(0,0,0,0.6); transition: all 0.2s ease; cursor: ${ac.isClickAch ? 'pointer' : 'default'};">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        ${renderIcon}
                        <div>
                            <div style="font-size: 16px; font-weight: bold; text-shadow: 0 0 4px ${ac.color || '#fff'};">${ac.name}</div>
                            <div style="font-size: 12px; color: #fff; margin-top: 2px;">
                                ${chanceText} • <span style="color: ${isObtained ? '#4ef072' : '#888'}; font-weight: ${isObtained ? 'bold' : 'normal'}">${statusText}</span>
                            </div>
                            <div style="font-size: 11px; color: #ccc; margin-top: 1px; font-style: italic;">${ac.desc}</div>
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
    ],
})

addLayer("i", {
    name: "input",
    symbol: "I",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        inputText: "",
        failedAttempts: 0
    }},
    tooltip: "Input Box",
    color: "#e6c229",
    row: 'side',
    resource: "output boxes",
    type: "none",
    layerShown() { 
        return player.p.completedAchievements.includes("bakup")
    },
    tabFormat: [
        ["raw-html", function() {
            let activeLayer = this.layer
            let htmlStr = `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; margin: 20px auto; max-width: 400px; font-family: monospace;">
                <input 
                    id="text-input-field"
                    type="text" 
                    placeholder="Whenever you're ready!" 
                    style="width: 100%; padding: 10px; background: #161616; border: 2px solid #e6c229; border-radius: 6px; color: #fff; font-family: monospace; font-size: 14px; text-align: center; box-shadow: inset 0 0 8px rgba(0,0,0,0.8);"
                />
                <button 
                    onclick="
                        let val = document.getElementById('text-input-field').value;
                        player['${activeLayer}'].inputText = val;
                        let cleanVal = val.trim();
                        let cleanValLower = cleanVal.toLowerCase();
                        let matched = false;
                        
                        if (cleanVal.length >= 512) {
                            matched = true;
                            if (player.p && player.p.completedAchievements && !player.p.completedAchievements.includes('int')) {
                                player.p.completedAchievements.push('int');
                                player['${activeLayer}'].inputText = '';
                                document.getElementById('text-input-field').value = '';
                            }
                        } else if (cleanValLower === 'elephant') {
                            matched = true;
                            if (player.p && player.p.completedAchievements && !player.p.completedAchievements.includes('achun')) {
                                player.p.completedAchievements.push('achun');
                                player['${activeLayer}'].inputText = '';
                                document.getElementById('text-input-field').value = '';
                            }
                        } else if (cleanValLower === '.- -.-. .... .. . ...- . -- . -. - ...') {
                            matched = true;
                            if (player.p && player.p.completedAchievements && !player.p.completedAchievements.includes('ms4ac')) {
                                player.p.completedAchievements.push('ms4ac');
                                player['${activeLayer}'].inputText = '';
                                document.getElementById('text-input-field').value = '';
                            }
                        } else if (cleanValLower === 'pneumonoultramicroscopicsilicovolcanoconiosis') {
                            matched = true;
                            if (player.p && player.p.completedAchievements && !player.p.completedAchievements.includes('longw')) {
                                player.p.completedAchievements.push('longw');
                                player['${activeLayer}'].inputText = '';
                                document.getElementById('text-input-field').value = '';
                            }
                        } else if (cleanVal === '67') {
                            matched = true;
                            if (player.p && player.p.completedAchievements && !player.p.completedAchievements.includes('what')) {
                                player.p.completedAchievements.push('what');
                                player['${activeLayer}'].inputText = '';
                                document.getElementById('text-input-field').value = '';
                            }
                        }
                        
                        if (cleanVal !== '') {
                            if (matched) {
                                player['${activeLayer}'].failedAttempts = 0;
                            } else {
                                if (player['${activeLayer}'].failedAttempts === undefined) player['${activeLayer}'].failedAttempts = 0;
                                player['${activeLayer}'].failedAttempts++;
                                if (player['${activeLayer}'].failedAttempts >= 3) {
                                    if (player.p && player.p.completedAchievements && !player.p.completedAchievements.includes('try')) {
                                        player.p.completedAchievements.push('try');
                                    }
                                    player['${activeLayer}'].failedAttempts = 0;
                                }
                                player['${activeLayer}'].inputText = '';
                                document.getElementById('text-input-field').value = '';
                            }
                        }
                    "
                    onmouseenter="this.style.backgroundColor='#e6c229'; this.style.color='#161616';"
                    onmouseleave="this.style.backgroundColor='transparent'; this.style.color='#e6c229';"
                    style="padding: 8px 16px; background: transparent; border: 2px solid #e6c229; border-radius: 6px; color: #e6c229; font-family: monospace; font-size: 13px; font-weight: bold; cursor: pointer; transition: all 0.2s ease;"
                >
                    confirm
                </button>
            </div>`
            return htmlStr
        }]
    ]
})

addLayer("s", {
    name: "start",
    symbol: "S",
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    tooltip: "Start",
    nodeStyle: {
        background: "linear-gradient(#e33b3b, #8a13a3, #0d011a)",
        backgroundOrigin: "border-box",
        borderColor: "rgba(227, 59, 59, 0.4)",
        color: "rgb(255, 255, 255)"
    },
    color: "#e33b3b",
    requires: new Decimal(1),
    resource: "starts",
    baseResource: "protons",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.222,
    row: 1,
    layerShown() { 
        return player.p.completedAchievements.includes("begin")
    },
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() {
        let exp = new Decimal(1)
        return exp
    },
    passiveGeneration() {
        let Gen = 0
        if (hasUpgrade('s', 13)) Gen = 1
        return Gen
    },
    upgrades: {
        11: {
            title: "Begin.",
            description: "Start getting 0.2 glass/s. ",
            cost: new Decimal(0),
        },
        12: {
            title: "Is this the world's most generic upgrade?",
            description: "x2 glass/s.",
            cost: new Decimal(3),
        },
        13: {
            title: "This is getting boring.",
            description: "x2.5 glass/s, and automatically generate starts.",
            cost: new Decimal(10),
        },
        14: {
            title: "Achievements! I love achievements!",
            description: "Get a free achievement when you buy this!",
            cost: new Decimal(50e50),
            onPurchase() {
                if (player.p && player.p.completedAchievements && !player.p.completedAchievements.includes("stach")) {
                    player.p.completedAchievements.push("stach")
                }
            }
        },
        21: {
            title: "",
            description: "",
            cost: new Decimal(50e50),
        },
        22: {
            title: "",
            description: "",
            cost: new Decimal(50e50),
        },
        23: {
            title: "",
            description: "",
            cost: new Decimal(50e50),
        },
        24: {
            title: "",
            description: "",
            cost: new Decimal(50e50),
        },
    },
    tabFormat: [
        "main-display",
        function() {
            if (hasUpgrade(this.layer, 13)) return ""
            return "prestige-button"
        },
        "blank",
        "upgrades"
    ]
})