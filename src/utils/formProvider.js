import React from 'react';
  function formProvider (fields){
      return function(Comp){

          const initialFormState={};
          for(const key in fields){
              initialFormState[key]={
                  value:fields[key].defaultValue,
                  error:''


              };
          }

          class FormComponent extends React.Component{
              constructor (props){
                  super(props);
                  this.state={
                      form:initialFormState,
                      formValid:false
                  }
                  this.handleValueChange=this.handleValueChange.bind(this);
                  this.setFormValue=this.setFormValue.bind(this);

              };
                setFormValue(values){
                    if(!values){
                        return;
                    }

                    const {form}=this.state;
                    let newForm={...form};
                    for(const field in form){
                        if(form.hasownproperty(field)){
                            if(typeof values[field] !=='undefined'){
                                newForm[field] = {...newForm[field],value: values[field]}
                            }
                            // 正常情况下主动设置的每个字段一定是有效的
                            newForm[field].valid=true;
                        }

                        this.setState({form: newForm});
                    }
                }
              handleValueChange(fieldName,value){
                  // if(type==='number'){
                  //         value=+value;
                  //     }
                  const{form}=this.state;

                  const newFieldState={value,valid:true,error:''};

                  const fieldRules=fields[fieldName].rules;

                  for(let i=0;i<fieldRules.length;i++){
                        const {pattern,error}=fieldRules[i];
                        let valid=false;
                        if(typeof pattern==='function'){
                            valid=pattern(value);
                        }else{
                            valid=pattern.test(value);
                        }
                        if(!valid){
                            newFieldState.valid=false;
                            newFieldState.error=error;
                            break;
                        }

                  }

                  const newForm={...form,[fieldName]:newFieldState};
                  const formValid=Object.values(newForm).every(f=>f.valid);
                  this.setState({
                      form:newForm,
                      formValid
                  });
              }
              render(){
                  const{form,formValid}=this.state;
                  return <Comp
                      {...this.props}
                      form={form}
                      formValid={formValid}
                      onFormChange={this.handleValueChange}
                      setFormValues={this.setFormValues}
                  />
              }
          }
           return FormComponent;
      }
  }



    export default formProvider;
