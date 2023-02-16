
import { Card, Button } from 'antd';
import logUserOut from '../authentication/logOut';

function UserProfileCard(props) {
  console.log(props.user)
  return (
    <Card title={props.user["http://schema.org/alternateName"]}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Button type='primary' onClick={(e) => {logUserOut(e)}}>Log Out</Button>
      </div>
    </Card>
  );
}


export default UserProfileCard;