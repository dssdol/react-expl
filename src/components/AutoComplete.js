import React from 'react';
import PropTypes from 'prop-types';
import style from '../styles/autoComplete.less'

function getItemValue(item) {
    return item.value || item;
}

class AutoComplete extends React.Component{
    constructor(props){
        super(props);

        this.state={
            displayValue:'',
            activeItemIndex:-1
        }
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleLeave = this.handleLeave.bind(this);

    }
    handleChange(value){
        this.setState({
            displayValue:'',
            activeItemIndex:-1
        });
        this.props.onValueChanges(value);
    }
    handleEnter (index) {
        const currentItem = this.props.options[index];
        this.setState({activeItemIndex: index, displayValue: getItemValue(currentItem)});
    }

    handleLeave () {
        this.setState({activeItemIndex: -1, displayValue: ''});
    }
    handleKeyDown(e){
        const {activeItemIndex}=this.state;
        const {options}=this.props;

        switch(e.keyCode){
            //判断是否是回车键
            case 13:{
                if(activeItemIndex>=0){
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleChange(getItemValue(options[activeItemIndex]));
                }
                break;
            }
            case 38:
            case 40:{
                e.preventDefault();
                this.removeItem(e.keyCode===38?'up':'down');
                break;
            }

        }
    }

    removeItem(direction){
        const {activeItemIndex} = this.state;
        const {options} = this.props;
        const lastIndex=options.length-1;
        let newIndex=-1;

        if(direction==='up'){
            if(activeItemIndex===-1){
                newIndex=lastIndex;
            }else{
                newIndex=activeItemIndex-1;
            }
        }else{
           if(activeItemIndex<lastIndex){
                newIndex=activeItemIndex+1;
            }
        }

        let newDisplayValue='';
        if(newIndex>=0){
            newDisplayValue=getItemValue(options[newIndex]);
        }

        this.setState({
            displayValue:newDisplayValue,
            activeItemIndex:newIndex,
        })

    }

    render(){
        const {displayValue,activeItemIndex}=this.state;
        const {value,options}=this.props;

        return(
            <div className={style.wrapper} onMouseLeave={this.handleLeave}>
                <input type="hidden" value="丁姗姗" />
                <input type='text' value={displayValue || value}
                       onChange={e => this.handleChange(e.target.value)}
                       onKeyDown={this.handleKeyDown}
                />
                {
                    options.length>0 && (
                        <ul className={style.options}>
                            {
                                options.map((item,index)=>{
                                    return(
                                        <li key={index} className={index===activeItemIndex? style.active : ''}
                                            onMouseEnter={() => this.handleEnter(index)}
                                            onClick={() => this.handleChange(getItemValue(item))}
                                        >
                                            {item.text || item}
                                            </li>
                                    );
                                })
                            }
                        </ul>
                    )
                }
            </div>
        )
    }
}

AutoComplete.propTypes={
    value:PropTypes.string.isRequired,
    options:PropTypes.array.isRequired,
    onValueChanges:PropTypes.func.isRequired
}

export default AutoComplete;