'use strict';

module.exports.create = create

function create() {
    return FsmHandler()
}

function FsmHandler() {
    var logicalOpers = {
        $and: 0,
        $or: 1,
    },
    comparisonOpers = {
        $eq: 0,
        $ne: 1,
    },
    compare = function(compOpenKey, result, expected) {
        switch (comparisonOpers[compOpenKey]) {
            case comparisonOpers.$eq:
                return result === expected;
            case comparisonOpers.$ne:
                return result !== expected;
        }
    };

    return {
        process : function(e, key, events, cursorEvents) {
            for(let x = 0; x < cursorEvents.length; x += 1) {
                let obj = cursorEvents[x];
                let andSuccessLevel1, orSuccessLevel1, andSuccessLevel2, level1Success, level2Success, 
                    orSuccessLevel2, resultLevel1, resultLevel2, ruleOperKey, 
                    ruleFn, fnResult, ifOperKey, ifOperValue, compOpenKey, expected, 
                    ifsList, ifObj, andsCountLevel1, andsCountLevel2;
              
                for(let y = 0; y < obj.events.length; y += 1) {    
                    let ev = obj.events[y];
                    if (ev._event === events[key]) {
                        andsCountLevel1 = (obj.ruleFuncs.filter((rule) => logicalOpers[Object.keys(rule)[0]] === logicalOpers.$and)).length;
                        andSuccessLevel1 = andsCountLevel1 < 1 ? false : true;
                        orSuccessLevel1 = false;
                        resultLevel1 = true;

                        for(let i = 0; i < obj.ruleFuncs.length; i += 1) {
                            ruleOperKey = Object.keys(obj.ruleFuncs[i])[0];
                            ruleFn = obj.ruleFuncs[i][`${ruleOperKey}`];
                            fnResult = ruleFn(e);
                            ifsList = obj.ruleFuncs[i]['$if'];
                            andsCountLevel2 = (ifsList.filter((_if) => logicalOpers[Object.keys(_if)[0]] === logicalOpers.$and)).length;
                            andSuccessLevel2 = andsCountLevel2 < 1 ? false : true;
                            orSuccessLevel2 = false;

                            for(let j = 0; j < ifsList.length; j += 1) {
                                ifObj = ifsList[j];
                                ifOperKey = Object.keys(ifObj)[0];
                                ifOperValue = ifObj[`${ifOperKey}`];
                                compOpenKey = Object.keys(ifObj[`${ifOperKey}`])[0];
                                expected = ifOperValue[`${compOpenKey}`];

                                if (!andSuccessLevel2 && logicalOpers[ifOperKey] === logicalOpers.$and) continue;

                                resultLevel2 = compare(compOpenKey, fnResult, expected);

                                if(logicalOpers[ifOperKey] === logicalOpers.$and && !resultLevel2) andSuccessLevel2 = false;
                                if(logicalOpers[ifOperKey] === logicalOpers.$or && resultLevel2) orSuccessLevel2 = true;
                            };

                            level2Success = andSuccessLevel2 || orSuccessLevel2;

                            if(logicalOpers[ruleOperKey] === logicalOpers.$and && !level2Success) andSuccessLevel1 = false;
                            if(logicalOpers[ruleOperKey] === logicalOpers.$or && level2Success) orSuccessLevel1 = true;
                        }

                        level1Success = andSuccessLevel1 || orSuccessLevel1;

                        if(level1Success) {
                            obj.actions.forEach((action) => {
                                action.action(e);                                
                            });
                            break;
                        }
                    }
                };

                if(level1Success) break;
            };
        },
    }
};
