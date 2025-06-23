import React, {FunctionComponent} from 'react';

interface ITitleLotery {
    title: string;
}

const TitleLotery : FunctionComponent<ITitleLotery> = ({title}) => {
    return (
        <div className={"mb-14"}>
            <div className={"font-bold text-3xl text-center"}>
                {title}
            </div>
        </div>
    );
};

export default TitleLotery;