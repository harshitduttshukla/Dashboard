import HeaderAndValue from "../ReusedCompontets/HeaderAndValue"


const SpscanArr:React.FC<any>  = ({ScanArray}) => {

    return (
        <div>
          <section>
        <h2 className="text-xl font-semibold mb-3">Raw Scan Results</h2>
        {ScanArray && ScanArray.length > 0 ? (
          <table className="table-auto w-full border border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <HeaderAndValue header={true} Title="Data" />
                <HeaderAndValue header={true} Title="PID" />
                <HeaderAndValue header={true} Title="Input" />
              </tr>
            </thead>
            <tbody>
              {ScanArray.map((item:any, index:number) => (
                <tr key={index} className="hover:bg-gray-50">
                  <HeaderAndValue Title={item.data} />
                  <HeaderAndValue Title={item.pid} />
                  <HeaderAndValue Title={item?.input} />
                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 italic">No scan data available.</p>
        )}
      </section>
        </div>
    )
}







export default SpscanArr;



