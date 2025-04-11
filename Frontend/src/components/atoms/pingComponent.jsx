import usePing from "../../hooks/apis/queries/usePing";
export function PingComponent() {
     const { isLoading, data } = usePing();
     if(isLoading){
       return (
         <>
           Loading...
         </>
       )
     }
     return (
       <>
         Hello {data.message}
       </>
     )
};
