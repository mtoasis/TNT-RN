import React from 'react';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import StartPage from '../../pages/StartPage'
import DashBoard from '../../pages/DashBoard'
import FindPage from '../../pages/FindPage'
import InboxPage from '../../pages/InboxPage'
import PostPage from '../../pages/PostPage'
import DetailPage from '../../pages/DetailPage'
import MessagePage from '../../pages/MessagePage'
import Testing from '../../pages/testing'
import { Ionicons } from '@expo/vector-icons';



const FindStack = StackNavigator({
    FindTool: { screen: FindPage },
    Detail: { screen: DetailPage}       
}
)

const PostStack = StackNavigator({
    PostTool: { screen: PostPage }    
}
)

const InboxStack = StackNavigator({
    Inbox: { screen: InboxPage },
    Message: { screen: MessagePage}       
}
)

const DashStack = StackNavigator({
    DashBoard: { screen: DashBoard },
}
)

export default Tabs = TabNavigator(

    {     
        // Testing: {screen:Testing},      
        DashBoard: { screen: DashStack }, 
        PostTool: { screen: PostStack },         
        FindTool: { screen: FindStack },             
        Inbox: { screen: InboxStack },
        
    },
    {
        navigationOptions: ({ navigation }) => ({            
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'DashBoard') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                }
                else if (routeName === 'Inbox') {
                    iconName = `ios-chatboxes${focused ? '' : '-outline'}`;
                }
                else if (routeName === 'FindTool') {
                    iconName = `ios-search${focused ? '' : '-outline'}`;
                }
                else if (routeName === 'PostTool') {
                    iconName = `ios-create${focused ? '' : '-outline'}`;
                }
                // else if (routeName === 'Testing') {
                //     iconName = `ios-lock${focused ? '' : '-outline'}`;
                // }

                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
        },
        animationEnabled: false,
        swipeEnabled: true,
        
    }
);

