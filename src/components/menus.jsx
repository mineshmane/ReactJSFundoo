import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


export default class popMenu extends React.Component {
    render() {

        return (
         


<div>
      {/* <div>

      <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
            Open Menu
          </Button>
         
        </React.Fragment>
      )}
    </PopupState>
      </div>
      <div>
      <Menu {...bindMenu(this.popupState)}>
            <MenuItem onClick={this.popupState.close}>Cake</MenuItem>
            <MenuItem onClick={this.popupState.close}>Death</MenuItem>
          </Menu>
      </div>
       
    </div> */}
    

                <PopupState variant="popover" popupId="demo-popup-menu">
                    {popupState => (
                        <React.Fragment> 
                            {/* <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                                Open Menu
              </Button> */}

               <img src={require('../assets/images/more_options.svg')}
                        className="img"
                        alt="remind me"
                        {...bindTrigger(popupState)}
                    />
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}>Cake</MenuItem>
                                <MenuItem onClick={popupState.close}>Death</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </div>

        );
    }


}