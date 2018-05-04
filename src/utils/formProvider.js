import React from 'react';
  function formProvider (fields){
      return function(Comp){

          const initialFormState={};
          for(const key in fields){
              initialFormState[key]=fields[key]
          }
          class FormComponent extends React.Component{
              constructor (props){
                  super(props);
                  this.state={
                      form:initialFormState,
                  }
                  this.handleValueChange=this.handleValueChange.bind(this);
                  this.setFormValues=this.setFormValues.bind(this);

              };
                setFormValues(values){
                    if(!values){
                        return;
                    }

                    const {form}=this.state;
                    let newForm={...form};

                    this.setState({form:values});
                }
              handleValueChange(fieldName,value){
                  // if(type==='number'){
                  //         value=+value;
                  //     }
                  const{form}=this.state;


                  const newForm={...form,[fieldName]:value};
                  this.setState({
                      form:newForm,
                  });
              }
              render(){
                  const{form}=this.state;

                  console.log(this.state,"123");
                  console.log(form,"1234567890");
                  return <Comp
                      {...this.props}
                      form={form}
                      onFormChange={this.handleValueChange}
                      setFormValues={this.setFormValues}
                  />
              }
          }
           return FormComponent;
      }
  }



    export default formProvider;
