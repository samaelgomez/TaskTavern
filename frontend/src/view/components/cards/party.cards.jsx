import { GiHearts } from "react-icons/gi";
import { GiBroadsword } from "react-icons/gi";
import { GiRoundShield } from "react-icons/gi";

const MemberCard = ({ name }) => {
    return (
        <div className="memberCard userCard">
            <div className="memberInfoContainer">
                <div className="memberName">
                    <span>{name}</span>
                </div>
                <div className="memberStats">
                    <div className="hpStat">
                        <div className="hpIcon"><GiHearts/></div>
                        <div className="hpValue simpleFont-12">100</div>
                    </div>
                    <div className="atkStat">
                        <div className="atkIcon"><GiBroadsword/></div>
                        <div className="atkValue simpleFont-12">100</div>
                    </div>
                    <div className="defStat">
                        <div className="defIcon"><GiRoundShield/></div>
                        <div className="defValue simpleFont-12">100</div>
                    </div>
                </div>
            </div>
            <div className="memberImage">
                <div className="memberImageContainer"></div>
            </div>
        </div>
    );
}

export default MemberCard;