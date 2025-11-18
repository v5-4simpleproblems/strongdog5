function SetupRevCatchButtons() {
    /*if (typeof gRevCatch_ShowCustomButtons === 'undefined' || !gRevCatch_ShowCustomButtons) {
        return;
    }*/
    if (typeof gRevCatch === 'undefined') {
        setTimeout(SetupRevCatchButtons, 100);
        return;
    }
    if (!gRevCatch.isReady()) {
        setTimeout(SetupRevCatchButtons, 100);
        return;
    }
    gRevCatch.getUser().then( (user) => {
        document.getElementById('revCatchButtonContainer').style.display = 'flex';
        if (user.status == 'Needs login') {
            document.getElementById('theLoginButton').style.display = 'block';
            document.getElementById('theSubscribeButton').style.display = 'block';
            document.getElementById('theLogoutButton').style.display = 'none';
            document.getElementById('theProfileButton').style.display = 'none';
            
            if (document.getElementById('premium')) 
                document.getElementById('premium').style.display = 'none';
                 //document.getElementById("game").src = "";
                
            if (document.getElementById('free')) 
                document.getElementById('free').style.display = 'block';
            
            if (document.getElementById('funskill')) 
                document.getElementById('funskill').style.display = 'block';
                 //document.getElementById("game").src = "";
               
            if (document.getElementById('fun')) 
                document.getElementById('fun').style.display = 'none';
			
			if (document.getElementById('reflectagonspdf')) 
                document.getElementById('reflectagonspdf').style.display = 'none';
       
        } else if (user.status == 'success') {

            let plan = user?.plan;  

            plan = plan || user?.account?.plans?.find( plan => plan.id === user?.account?.plan );
            plan = plan || user?.plans?.find( plan => plan.id === user?.active_plan )
            plan = plan || user?.plans?.find( plan => plan.id === user?.account.plan )

            //let userIsMathOnlyPlan = ( plan?.id == 'plan_SJg2eG4Bx1GfLh') ? true : false;
			
			let userIsMathOnlyPlan = (
			  plan?.id === 'plan_SJg2eG4Bx1GfLh' || plan?.id === 'plan_ShPDp46YBruUkn'
			);

            if (document.getElementById('top'))
                document.getElementById('top').style.display = 'none';
            if (document.getElementById('bottom'))
                document.getElementById('bottom').style.display = 'none';
            if (document.getElementById('content1'))
                document.getElementById('content1').style.display = 'none';
            if (document.getElementById('content2'))
                document.getElementById('content2').style.display = 'none';
            if (document.getElementById('content3'))
                document.getElementById('content3').style.display = 'none';
            if (document.getElementById('content4'))
                document.getElementById('content4').style.display = 'none';
            if (document.getElementById('content5'))
                document.getElementById('content5').style.display = 'none';
            if (document.getElementById('square'))
                document.getElementById('square').style.display = 'none';
            if (document.getElementById('thinsky'))
                document.getElementById('thinsky').style.display = 'none';
			if (document.getElementById('freetext'))
                document.getElementById('freetext').style.display = 'none';
            //if (document.getElementById('asbindex'))
                //document.getElementById('asbindex').style.display = 'none';
            if (document.getElementById('thinskyL'))
                document.getElementById('thinskyL').style.display = 'none';
            if (document.getElementById('thinskyR'))
                document.getElementById('thinskyR').style.display = 'none';
            if (document.getElementById('lineseparator'))
                document.getElementById('lineseparator').style.display = 'none';
            if (document.getElementById('bonus'))
                document.getElementById('bonus').style.display = 'none';
           
            if (document.getElementById('free'))
                document.getElementById('free').style.display = 'none';
            if (document.getElementById('premium'))
                document.getElementById('premium').style.display = 'block';
			if (document.getElementById('reflectagonspdf')) 
                document.getElementById('reflectagonspdf').style.display = 'block';
            
            //need to check for a new user status - math only - then turn off fun skill games and display a message

            if ( userIsMathOnlyPlan ) {
                if (document.getElementById('funskill'))
                    document.getElementById('funskill').style.display = 'none';
				if (document.getElementById('funbutton'))
                    document.getElementById('funbutton').style.display = 'none';
				if (document.getElementById('skillgames'))
                    document.getElementById('skillgames').style.display = 'none';
                if (document.getElementById('fun'))
                    document.getElementById('fun').style.display = 'block';
				
				// Show labels for excluded fun games
				/*const warnings = document.querySelectorAll('.math-only-warning');
				warnings.forEach(el => {
					el.style.display = 'inline';
				});*/
				
				const mathOnlyLocks = document.querySelectorAll('.math-only-lock');
				mathOnlyLocks.forEach(el => {
				  el.style.display = 'inline';
				});
            }
			
			// Hide lock icons for any valid subscriber (full or math-only)
			const lockIcons = document.querySelectorAll('.my-icon');
			lockIcons.forEach(el => {
			  el.style.display = 'none';
			});

            document.getElementById('theLoginButton').style.display = 'none';
            document.getElementById('theSubscribeButton').style.display = 'none';
            document.getElementById('theLogoutButton').style.display = 'block';
            
            if (localStorage.getItem("restricted_user") === 'true')
                document.getElementById('theProfileButton').style.display = 'none';
            else
                document.getElementById('theProfileButton').style.display = 'block';
        } else {
            console.log('RevCatch: Unknown user status');
        }
    }
    ).catch( (error) => {
        console.log('RevCatch: Error getting user');
    }
    );
}
function handleLogoutClick() {
    gRevCatch.logout();
    window.location.reload();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', (event) => {
        SetupRevCatchButtons();
    }
    );
} else {
    SetupRevCatchButtons();
}