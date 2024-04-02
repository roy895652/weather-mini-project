import React, { useState, useEffect } from "react";
import "./style.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {


  // add the items fucnction
  const [inputdata, setInputData] = useState("")
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //add
  const addItems = () => {
    if (!inputdata) {
      alert('plz fill the data')
    } else if(inputdata && toggleButton){
      setItems(
        items.map((curElem)=>{
          if(curElem.id === isEditItem){
            return { ...curElem ,name : inputdata}
          }
          return curElem;
        })
      );

      setInputData("")
      setIsEditItem(null);
      setToggleButton(false);
    }else {
      /**
       * here ...items contain the pervious value
       */
      const myOwnItems = {
        id: new Date().getTime().toString(),
        name: inputdata
      }
      setItems([...items, myOwnItems])
      setInputData("")
    }

  }
  //edit the items
  const editItem = (itemId) => {
    const editItems = items.find((curElem, index) => {
      return curElem.id === itemId;
    });
    setInputData(editItems.name)
    setIsEditItem(itemId);
    setToggleButton(true);
  }

  // remove all the elements
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      // console.log(curElem.id);
      return curElem.id !== index;
    });
    setItems(updatedItems);
  }

  const removeAllItems = () => {
    setItems([]);
  }

  // adding localStorage
  useEffect(() => {
    //effect
    localStorage.setItem("mytodolist", JSON.stringify(items))
    // return () => {
    //   //cleanup
    // }
  }, [items])


  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}

            />
            {
              toggleButton === true ? <i className="fa fa-edit add-btn" onClick={addItems}></i> :
                <i className="fa fa-plus add-btn" onClick={addItems}></i>
            }
            {/* <i className="fa fa-plus add-btn" onClick={addItems}></i> */}

          </div>


          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAllItems}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
