'use strict'; 

function BetsComponent(dataCoordinator) {
    const _this = this; 
    const _bets = {}; 
    let _showAll = false;
    let _matches = {}; 
    const _months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; 

    ComponentBase.call(this, dataCoordinator);

    /**
     * 
     * @param {*} trade 
     */
    const formatTooltipText = (bet) => {  
        return exception.try(() => {
            //let output = `<span class='small-green-text console-cell' style='width:130px'>${order.orderId}</span>` + 
            //`<span class='small-green-text console-cell' style='width:130px'>${order.timestamp}</span>`; 

            let output = "";
            //let output = `${order.orderId}<br/><br/>` + 
            //`${new Date(Date.parse(order.timestamp.toString())).toString()}<br/><br/>` + 
            //`${order.fullStatus ? order.fullStatus : order.status}`; 

            return output; 
        });
    }; 

    const formatMatchDate = (timestamp) => {
        let output = timestamp; 

        //TODO: convert for local timezone
        const date = new Date(timestamp * 1000); 
        output = `${_months[(date.getMonth())]} ${date.getDay()}`;

        if (date.getFullYear != new Date().getFullYear())
            output += ', ' + date.getFullYear(); 

        return output; 
    };

    const formatMatchOutcome = (outcome) => {
        let output = 'unknown'; 

        switch(parseInt(outcome)) {
            case 0: 
            output = 'pending';
                break;
            case 1: 
                output = 'underway';
                break;
            case 2: 
                output = 'draw';
                break;
            case 3: 
                output = 'decided';
                break;
            default:
                output= outcome;
        }

        return output; 
    };

    this.showAll = () => { return _showAll; }

    /**
     * show/hide local progress spinner
     * @param {*} show 
     */
    this.progress = (show) => {
        if (show)
            $("#betsProgress").css('display', 'block');
        else 
            $("#betsProgress").css('display', 'none');
    };

    /**
     * 
     */
    this.toggleShowAll = () => {
        _showAll = !_showAll;
        //_this.dataCoordinator.refreshOrders(_showAll); 

        //change the menu item text 
        const menuItemText = (_showAll) ? 'hide inactive' : 'show all'; 
        _this.toolbar.setMenuItemText(0, menuItemText); 
    };

    this.addOrUpdate = (bet) => {
        if (match) {
            _bets[bet.matchId] = bet; 
            const matchId = bet.matchId;
            let rowId = `div-bet-${matchId}`;

            let rowHtml = `<span class='small-gold-text console-cell' style='width:300px'>${getMatchName(matchId)}</span>` + 
                    `<span class='small-gold-text console-cell' style='width:160px'>${formatBetAmount(bet.amount)}</span>` + 
                    `<span class='small-gold-text console-cell' style='width:100px'>${formatChosen(matchId, bet.chosenWinner)}</span>` +
                    `<span class='small-gold-text console-cell' style='width:100px'>${formatBetResult(bet)}</span>` +
                    `<span class='tooltip-text'>${formatTooltipText(bet)}<span>`;
            
            console.log($("#" + rowId));
            if ($("#" + rowId).length) {
                $("#" + rowId).html(rowHtml); 
            } else {
                $("#betsContent").append(`<div class='console-row tooltip' id='${rowId}'>${rowHtml}</div>`);
            }
        }
    };

    this.updateMatches = (matches) => {
        _matches = matches; 
    }; 
    
    this.render = () => {
        return exception.try(() => {
            _this.toolbar = new Toolbar([
                {
                    type:'settings',
                    id: 'betsSettings',
                    menu: [
                        {
                            id: 'showAllBets',
                            text: 'show all',
                            onClick: () => { _this.toggleShowAll(); }                        
                        }
                    ]
                }, 
                {
                    type:'refresh',
                    id: 'betsRefresh',
                    onClick: () => { _this.dataCoordinator.refreshBets(_showAll); }
                }
            ]);
    
            return ("<div id='betsComponent'>" +         
                "<div id='betsProgress' class='loader'></div>" + 
                "<div id='betsContent'></div></div>");
        });
    };
}

