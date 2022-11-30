import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../../store';
import ReactGrid from '../../../components/ReactGrid';
import { stateBase } from '../../../model/general/stateBase';
import * as NewsLetterStore from '../../../store/NewsLetter';
import { VwNewsLetter, columnStructure } from '../../../model/viewModel/VwNewsLetter';

import { AdminModelRequest } from '../../../model/viewModel/AdminModelRequest';

type NewsLetterProps =
    stateBase<VwNewsLetter> &
    typeof NewsLetterStore.actionCreators &
    RouteComponentProps<{}> &
    {  pId: string,selectRecord: any, editable: boolean, isSelected?: boolean, valuefiltersl: string,noselectId:string,typeForm:string  };

class NewsLetter extends React.PureComponent<NewsLetterProps> {
    // constructor(props: any) {
    //     super(props);

    // }
    private ensureDataFetched() {
        this.getData(1, 10, '')

    }

    componentDidMount() {

        // this.setState({ isload: this.props.isLoading })
        // console.log(this.props.isLoading);
        this.props.checkSecurity(this.props.history);
        this.ensureDataFetched();
    }
    componentDidUpdate() {

        // this.setState({ isload: this.props.isLoading })
        // console.log(this.props.isLoading);
    }


        getData = (pageNo: number, pageSize: number, filter: string,sort?: string, sortKey?: string) => {
         
        let isSelected = (this.props.isSelected === undefined) ? false : this.props.isSelected;
        const rm:AdminModelRequest={pageNo:pageNo,pageSize:pageSize,filter:filter,resourceName:"newsletter.Menu",isSelected:isSelected,sort:sort,sortKey:sortKey,parentId:this.props.pId,filtersl:this.props.valuefiltersl,noselectId:this.props.noselectId};
        this.props.requestList(rm);

    }

    deleteRecord = (id: string) => {
        this.props.deleteRecord(id);
    }

    editRecord = (id: string) => {
        this.props.ChangeTab('','NewsLetter','NewsLetterEdit');
        this.props.editData(id);

    }
    newRecord = () => {
        this.props.ChangeTab('','NewsLetter','NewsLetterEdit');
        this.props.editData();
    }
    selectRecord = (id: string, selectedColumns: string) => {
        if (this.props.selectRecord !== undefined)
            this.props.selectRecord(id, selectedColumns);
    }
    handleSearch = (event: any) => {

        event.preventDefault();
        //const senddata = convertToObject(sdata) as VwNewsLetter;
        let fl = "";
        this.getData(1, 10, fl);

    }

    public render() {

        return (

            <React.Fragment>

                <div key={1}>

                    <ReactGrid
                        {
                        ...{
                            title: 'Newsletter.Grid',
                            columns: columnStructure,
                            editable: true,
                            data: this.props.models,
                            count: this.props.count,
                            getData: this.getData,
                            deleteRecord: this.deleteRecord,
                            filter: this.props.filter,
                            editRecord: this.editRecord,
                            selectRecord: this.selectRecord,
                            pageSize: this.props.pageSize,
                            pageNo: this.props.pageNo,
                            newRecord: this.newRecord,
                            
                            internalLoading: this.props.isLoading,
                            sort: this.props.sort,
                            isSelected: this.props.isSelected,
                            
                        }
                        }

                    />
                </div>
            </React.Fragment>

        );
    }
};

export default connect(
    (state: ApplicationState) => state.newsletter,
    NewsLetterStore.actionCreators
)(NewsLetter as any);

