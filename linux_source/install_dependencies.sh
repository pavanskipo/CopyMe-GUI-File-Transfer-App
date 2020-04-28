
if dpkg-query -W -f='${Status} ${Version}\n' nmap | grep 'installed'
then
    echo "dependencies checked"
else
    echo "Installing linux dependencies..."

    apt-get update
    apt-get install nmap

    echo "dependencies checked"
fi
