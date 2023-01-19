import MemberImg from "../../assets/member.png";
import Col from "react-bootstrap/Col";
import "../../scss/avatar.scss";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ClientsProps } from "../../constants"

type AvatarProps = Pick<ClientsProps, "avatar">;

const Avatar = ({ avatar }: AvatarProps): ReactJSXElement => {

  return (
    <div className="avatar">
      <img src={typeof avatar !== "undefined" && (Boolean(avatar)) ? avatar : MemberImg} alt="client" />
      <Col>
        <ul className="list-unstyled " style={{ paddingTop: "10px" }}>
          <li>
          </li>
        </ul>
      </Col>
    </div>
  );
};

export default Avatar;


