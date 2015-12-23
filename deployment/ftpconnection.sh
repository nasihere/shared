#!/bin/bash
# Shell script to remove whole (nuke) ftp directory structure
# See url for more info:
# http://www.cyberciti.biz/tips/how-to-nuke-a-ftp-server.html
# -----------------------------------------------
# Copyright (c) 2006 nixCraft project <http://cyberciti.biz/fb/>
# This script is licensed under GNU GPL version 2.0 or above
# -------------------------------------------------------------------------
# This script is part of nixCraft shell script collection (NSSC)
# Visit http://bash.cyberciti.biz/ for more information.
# -------------------------------------------------------------------------
# NOTE: Requires ncftp/ncftlls ftp clients/commands
# =========================================================================
# Ftp server settings

### change me ###############################
# ftp login user
FUSER='naszus'

# ftp password
FPASSWD='Nasir@1234'

# ftp server ip/name
FTPS='ftp.nasz.us'

# ftp dirs to nuke Separate multiple dirs using
# a blank/white space i.e. /dir1 /dir2)
FTPDIRS='/microtechsupportusainc/fast_bill_utm'
##############################################
for d in $FTPDIRS
do
subdires="$(ncftpls -u $FUSER -p $FPASSWD  ftp://${FTPS}/${d}/)"
for dir in $subdires
do
rdir="${d}/${dir}"
ncftp -u"$FUSER" -p"$FPASSWD" $FTPS<<EOF
cd $rdir
rm *
rmdir $rdir
quit
EOF
done
done
# end of script


ncftpput -R -u naszus -p Nasir@1234 ftp.nasz.us /microtechsupportusainc/fast_bill_utm /Users/Nasz/GitHub/shared/fast_bill_utm/dist
