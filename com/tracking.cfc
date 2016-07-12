<cfcomponent>
<cffunction name="forTracking" access="remote" output="false" >
  <cfsavecontent variable="iVistedThisPage">
           <cfprocessingdirective suppressWhiteSpace="true">
           <cfoutput>
            #session.CFID#, #session.CFTOKEN#, #CGI.REMOTE_ADDR#, #CGI.PATH_INFO#, #CGI.HTTP_USER_AGENT#, #dateFormat(now(), 'mm-dd-yyyy')#, #timeFormat(now(), 'hh:mm:ss')#,
           </cfoutput>
           </cfprocessingdirective>
  </cfsavecontent>
  
  	<!--- Get expanded path of the BASE path. --->
  <cfset strPath = ExpandPath( "./" ) />
  
  <!--- Get the expanded path of the CURRENT template path. --->
  <cfset strPath = GetDirectoryFromPath(GetCurrentTemplatePath()) />
  <cfif fileExists('#strPath#\usedCalculator.csv')>
  <!---Reads location.txt to find the what the IP address Should Be--->
  <cffile action="append" file="#strPath#\usedCalculator.csv" output="#trim(iVistedThisPage)#" addnewline="yes" >
  <cfelse>
  <cffile action="write" file="#strPath#\usedCalculator.csv" output="#trim(iVistedThisPage)#" addnewline="yes" >
  </cfif>

</cffunction>
</cfcomponent>