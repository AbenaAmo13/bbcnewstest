import React, {Component} from 'react';
/*Class that fetches and displays all the articles*/

 class Articles extends Component {
     _isMounted = false;
    constructor(props) {
        super(props);
        //Get all the articles:
        this.state = {
            articleTitle:null,
            articleImage : [],
            articleText: [],
            articleList : []
        };
    }
    async componentDidMount(){
        this._isMounted = true;
        const url ="https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-1.json";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({articleTitle: data.title})
        //this.setState({articleTitle: data.body})
        for(let i=0; i<parseInt(data.body.length); i++){
            //console.log(data.body[i].type)
            switch (data.body[i].type) {
                case "heading":
                    //console.log("pretty woman")
                    break;
                case "image":
                    //Add the image urls into the article image array.
                    this.setState({articleImage: [...this.state.articleImage, data.body[i].model]})
                    //console.log(this.state.articleImage)
                    break;
                case "list":
                    let numberOfItems = parseInt(data.body[i].model.items.length);
                    for (let k = 0; k < numberOfItems; k++) {
                        //Add the list items to the articleList array
                        this.setState({articleList: [...this.state.articleList, data.body[i].model.items[k]]})
                        //console.log(this.state.articleList)
                    }
                    break;
                case "paragraph":
                    //console.log(data.body[i].model)
                    //Add the paragraph information to the articleList array.
                    this.setState({articleText: [...this.state.articleText, data.body[i].model]})
                    //console.log(this.state.articleText)
            }
                    }
            }

    render(){
        const articleText = this.state.articleText

        console.log(articleText)

        return (<div>
                {articleText.map(function(textinfo, id){
                    return(
                        <ul>
                            <li key={id}>
                                {textinfo.text}
                            </li>
                        </ul>
                    )
                    }

                )}


            </div>

        );
    }
    }

export default Articles




